import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import { Link, HashRouter,Route, } from 'react-router-dom';
import DeletePost from './DeletePost';
import EditPost from './EditPost';

export default class ShowPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post_id: this.props.match.params.id,
            post: '',
            user_id: '',
            delete: false
        }
        this.updatePost = this.updatePost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }
    componentWillMount(){
        axios.get('/api/posts/' + this.state.post_id)
        .then((response) => {
            let post = response.data.post;
            this.setState({post:post})
        }).catch((error) => {

        })
    }
    updatePost(post){
        this.setState({post:post})
    }
    deletePost(post){
        this.setState({delete: true})
     }
    render() {
        let post = this.state.post;
        let redirect_to_home;
        if(this.state.delete == true) {
            redirect_to_home = <Redirect to="/home"></Redirect>;
        }
        let logined_user_post;
        if(this.state.post.user_id == sessionStorage.getItem('id')) {
            logined_user_post = (
                <div >
                    <div className="col-sm-6">
                        <EditPost id={this.state.post_id} editPost={this.updatePost} />
                    </div>
                    <div className="col-sm-6">  
                        <DeletePost id={this.state.post_id} deletePost={this.deletePost} />
                    </div>  
                </div>
            );
        }
        return (
            <div>
                <div className="container-fluid text-center">
                    <div className="jumbotron"><h2>{post.title}</h2></div>
                    <img className="img-rounded"  width="600px" src={'../images/' + post.image_path } />
                    <h4>{post.text}</h4>
                </div>
                {logined_user_post}
                {redirect_to_home}
            </div>
        )
    }
}
