import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import { HashRouter,Route, Link } from 'react-router-dom';
import EditPostButton from '../modals/EditPostButton';
import PropTypes from 'prop-types';

export default class EditPost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			post_title: '',
			post_text: '',
			image: '',
			selected_category: '',
			new_post: [],
			show_categories: [],
			data_target: '#'+this.props.id+'edit'
		}
		this.getPostTitle = this.getPostTitle.bind(this);
		this.getPostText = this.getPostText.bind(this);
		this.getPostImage = this.getPostImage.bind(this);
		this.changeSelect = this.changeSelect.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}
	getPostTitle(e) {
		this.setState({post_title: e.target.value});
	}
	getPostText(e) {
		this.setState({post_text: e.target.value});
	}
	getPostImage(e) {
		this.setState({image: e.target.files[0]});
	}
	changeSelect(e) {
		this.setState({selected_category: e.target.value}); 
	}
	submitForm(e) {
		e.preventDefault();
		let data = new FormData();
		data.append('title', this.state.post_title);
		data.append('text', this.state.post_text);
		data.append('category_id', this.state.selected_category);
		data.append('image_path', this.state.image);
		data.append('id', this.props.id);
		data.append('_method', "PUT");

		axios.post('/api/me/posts/' + this.props.id, data)
		.then((response) => {
			this.setState({new_post: response.data.edited_post});
			this.props.editPost(response.data.edited_post);
		})
	}
	componentWillMount() {
		axios.get('/api/categories').then((response) => {
            this.setState({
                show_categories: response.data.categories
            })
        })
	}
	render() {
		return (
			<div>
				<div className="row">
					<div className="editPost" data-toggle="modal" data-target={this.state.data_target}>
                        <button type="button" className="btn btn-warning center-block">Edit</button>
                    </div>
				</div>
				<EditPostButton
					modal_id={this.props.id}
					getPostTitle={this.getPostTitle}
                    post_title={this.state.post_title}
                    getPostText={this.getPostText}
                    post_text={this.state.post_text}
                    getPostImage={this.getPostImage}
                    changeSelect={this.changeSelect}
                    selected_category={this.state.selected_category}
          			submitForm={this.submitForm}
          			show_categories={this.state.show_categories}         
				/>
			</div>
		)
	}
}