import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import Categories from './categories/Categories';
import { HashRouter,Route } from 'react-router-dom';
import Posts from './posts/Posts';

export default class Home extends Component {

    render() {
        return (
            <div>
                <div className="container-fluid col-sm-3 categories-container text-center">
                    <div className="row">
                        <h2 className="categories_headname">Categories</h2>
                        <ul className="list-group">
                            <Categories />
                        </ul>
                    </div>
                </div>
                <div className="container-fluid col-sm-8 posts-container">
                    <div className="row">
                        <h2 className="text-center">Posts</h2>
                        <Posts />
                    </div>
                </div>
            </div>
        );
    }
}
