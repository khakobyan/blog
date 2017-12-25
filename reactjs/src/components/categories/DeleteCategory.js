import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import { HashRouter,Route, Link } from 'react-router-dom';
import DeleteCategoryButton from '../modals/DeleteCategoryButton';
import PropTypes from 'prop-types';

export default class DeleteCategory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			data_target: '#'+this.props.id+'delete'
		}
		this.deleteCategory = this.deleteCategory.bind(this); 
	}

	deleteCategory() {
		axios.delete('/api/me/categories/' + this.props.id)
		.then((response) => {
			this.props.deleteCategory(this.props.id);
		}).catch((error) => {

		})
	}
	render() {
		return (
			<div>
				<div className="row">
					<div className="deleteCategory" data-toggle="modal" data-target={this.state.data_target}>
                        <button type="button" className="btn btn-danger center-block">Delete</button>
                    </div>
				</div>
				<DeleteCategoryButton
					modal_id={this.props.id} 
					deleteCategory={this.deleteCategory}
				/>
			</div>
		)
	}
}
