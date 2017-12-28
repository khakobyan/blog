import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import { HashRouter,Route, Link } from 'react-router-dom';
import DeletePostButton from '../modals/DeletePostButton';
import PropTypes from 'prop-types';

export default class DeletePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_target: '#'+this.props.id+'delete'
        }
        this.deletePost = this.deletePost.bind(this);
    }
    deletePost() {
        axios.delete('/api/me/posts/' + this.props.id)
        .then((response) => {
            this.props.deletePost(response.data.resource);
        }).catch((error) => {

        })
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="deletePost" data-toggle="modal" data-target={this.state.data_target}>
                        <button type="button" className="btn btn-danger center-block">Delete</button>
                    </div>
                </div>
                <DeletePostButton
                    modal_id={this.props.id} 
                    deletePost={this.deletePost}
                />
            </div>
        )
    }
}
