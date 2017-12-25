import React, { Component } from 'react';
import axios from 'axios';
import {Redirect, HashRouter} from 'react-router-dom';
import Home from  '../Home'

export default class Login extends Component{
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            user_id: null,
            error: ''
        }
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    handleChangeEmail(e) {
        this.setState({email: e.target.value});
    }
    handleChangePassword(e) {
        this.setState({password: e.target.value});
    }
    submitForm(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        const url = '/api/login';
        axios.post(url, user).then((response) => {
            sessionStorage.setItem('id', response.data.user.id);
            sessionStorage.setItem('name', response.data.user.name);
            this.setState({user_id: response.data.user.id});
        });
    }
    
    render(){
        let redirect_to_home;
        if(this.state.user_id) {
            redirect_to_home = <Redirect to='/home'/>
        }   

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">Login</div>
                                <div className="panel-body">
                                    <form className="form-horizontal" role="form">
                                        <div className="form-group">
                                            <label htmlFor="email" className="col-md-4 control-label">E-Mail Address</label>
                                            <div className="col-md-6">
                                                <input id="email" type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleChangeEmail} required autoFocus />                                
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password" className="col-md-4 control-label">Password</label>
                                            <div className="col-md-6">
                                                <input id="password" type="password" className="form-control" name="password" onChange={this.handleChangePassword} value={this.state.password} required />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-6 col-md-offset-4">
                                                <div className="checkbox">
                                                    <label>
                                                        <input type="checkbox" name="remember" /> Remember Me
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                        <div className="col-md-8 col-md-offset-4">
                                            <button type="submit" className="btn btn-primary" onClick={this.submitForm} >
                                                Login {redirect_to_home}
                                            </button>
                                            <a className="btn btn-link" href="#">
                                                Forgot Your Password?
                                            </a>
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
