import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import { HashRouter,Route, Link } from 'react-router-dom';
import EditCategoryButton from '../modals/EditCategoryButton';
import PropTypes from 'prop-types';

export default class EditCategory extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			data_target: '#'+this.props.id+'edit',
			old_name: ''
		}
		this.getName = this.getName.bind(this);
		this.editCategory = this.editCategory.bind(this);
	}
	getName(e){
        this.setState({ name: e.target.value });
        this.setState({ old_name: e.target.value });
    }
    editCategory(){
    	axios.put('/api/me/categories/' + this.props.id,{'name': this.state.name})
    	.then((response) => {
    		this.props.editCategory({
    			id: this.props.id,
    			name: this.state.name
    		});
    	}).catch((error) => {

    	})
    }
    componentWillMount(){
        this.setState({old_name: this.props.old_name});
    }
    render(){
    	return (
    		<div>
				<div className="row">
					<div className="editCategory" data-toggle="modal" data-target={this.state.data_target}>
                        <button type="button" className="btn btn-warning center-block">Edit</button>
                    </div>
				</div>
				<EditCategoryButton
					modal_id={this.props.id}
					getName={this.getName} 
                    editCategory={this.editCategory} 
                    name={this.state.name} 
                    old_name={this.state.old_name}
				/>
			</div>
    	)
    }
}
