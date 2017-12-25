import React, { Component } from 'react';
import axios from 'axios';
import {Redirect, HashRouter} from 'react-router';
import PropTypes from 'prop-types';
import Home from  '../Home'

export default class Register extends Component{
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            error: '',
            success: false
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeConfirmPass = this.handleChangeConfirmPass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }
    handleChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    handleChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    handleChangeConfirmPass(e) {
        this.setState({
            password_confirmation: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        }

        let uri = '/api/register';
        axios.post(uri, user)
        .then((response) => {
            this.setState({success: true})
        })
        .catch((err) => {
            var errors = err.response.data;
            this.setState({errors: errors})
        });
    }

    render(){
        let redirect_to_home
        if(this.state.success){
            redirect_to_home = <Redirect to='/home' />; 
        } 

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">Register</div>
                            <div className="panel-body">
                                <form className="form-horizontal" role="form">
                                    <div className="form-group">
                                        <label htmlFor="name" className="col-md-4 control-label">Name</label>

                                        <div className="col-md-6">
                                            <input id="name" type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleChangeName} required autoFocus/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email" className="col-md-4 control-label">E-Mail Address</label>

                                        <div className="col-md-6">
                                            <input id="email" type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleChangeEmail} required />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password" className="col-md-4 control-label">Password</label>

                                        <div className="col-md-6">
                                            <input id="password" type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleChangePassword} required />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password-confirm" className="col-md-4 control-label">Confirm Password</label>

                                        <div className="col-md-6">
                                            <input id="password-confirm" type="password" className="form-control" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChangeConfirmPass} required />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-md-6 col-md-offset-4">
                                            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit} >
                                                Register 
                                                <div>
                                                    {redirect_to_home}
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        );
    }
}
