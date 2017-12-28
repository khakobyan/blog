import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import { Link, HashRouter, Route } from 'react-router-dom';

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }
    componentWillMount(){
        axios.get('/api/posts').then((response) => {
            const posts = response.data.resource;
            this.setState({posts: posts});
        }).catch((error) => {

        })
    }
    render() {
        return (
            <div className="panel panel-default all_posts_panel text-center">
                {
                    this.state.posts.map((value, index) => {
                        return (
                            <div className="panel panel-default col-sm-4" key={index}>
                                <div className="panel-heading">
                                    <Link to={'/posts/'+value.id}>
                                        {value.title}
                                    </Link>
                                </div>
                                <div className="panel-body">
                                    <Link to={'/posts/'+value.id}>
                                        <img widt="260" height="160" src={"../images/" + value.image_path} />
                                    </Link>
                                </div>
                                <div className="panel-footer">{value.category.name}</div>
                            </div>
                        ) 
                    })
                }
            </div>
        )
    }
}
