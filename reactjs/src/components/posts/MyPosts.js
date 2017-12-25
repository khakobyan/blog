import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import { Link, HashRouter, Route } from 'react-router-dom';
import AddPost from './AddPost';
import DeletePost from './DeletePost';
import EditPost from './EditPost';

export default class MyPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
        this.addPost = this.addPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.editPost = this.editPost.bind(this);
    }
    componentWillMount(){
        axios.get('/api/me/posts').then((response) => {
            this.setState({posts: Object.values(response.data)[0]});
        }).catch((error) => {

        })
    }
    addPost(post){
        let posts = this.state.posts;
        posts.push(post);
        this.setState({posts});
    }
    editPost(post){
        let posts = this.state.posts;
        let newPosts = posts.map((value, index) => {
            if(value.id == post.id) {
                value.title = post.title;
                return value;
            }
            return value;
        })
        this.setState({newPosts});
    }
    deletePost(post){
        let posts = this.state.posts;
        posts.map((value,index) => {
            if (value.id == post) {
                posts.splice(index, 1);
            }
        })
        this.setState({posts});
    }
    render() {
        return (
            <div className="container">
                <h2 className="text-center">My Posts</h2>
                <AddPost addPost={this.addPost}/>
                <ul className="list-group post-list center-block">
                    <div>
                    {
                        this.state.posts.map((value,index) => {
                            return (
                                <li key={index} className="list-group-item text-center col-sm-12">
                                    <div className="col-sm-6">
                                        <Link to={'/posts/'+value.id}>
                                            {value.title}
                                        </Link>
                                    </div>
                                    <div className="col-sm-3">
                                        <EditPost id={value.id} editPost={this.editPost} />
                                    </div>
                                    <div className="col-sm-3">  
                                        <DeletePost id={value.id} deletePost={this.deletePost} />
                                    </div> 
                                </li>
                            )
                        })
                    }
                    </div>  
                </ul>
            </div>
        )
    }
}
