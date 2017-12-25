import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import { HashRouter,Route, Link } from 'react-router-dom';
import AddCategoryButton from '../modals/AddCategoryButton';
import PropTypes from 'prop-types';

export default class AddCategory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			new_category: ''
		}
		this.getName = this.getName.bind(this);
		this.addCategory = this.addCategory.bind(this);
	}
	getName(e){
        this.setState({ name: e.target.value });
    }
    addCategory(){
    	axios.post('/api/me/categories', {'name': this.state.name})
    	.then((response) => {
    		this.setState({'new_category': response.data.category});
    		this.props.addCategory(this.state.new_category);
    	}).catch((error) => {

    	})
    }
    render() {
    	return (
    		<div>
                <div className="row">
                    <div className="addCategory" data-toggle="modal" data-target="#myModal">
                        <button type="button" className="btn btn-success center-block">Add Category</button><br/>
                    </div>
                </div>    
               <AddCategoryButton 
                    getName={this.getName} 
                    addCategory={this.addCategory} 
                    name={this.state.name}
                />
            </div>        
    	)
    }
}
