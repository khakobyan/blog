import React, { Component } from 'react';
import { Link, HashRouter, Route } from 'react-router-dom'
import axios from 'axios'; 
import Login from '../auth/Login';
import Register from '../auth/Register';

export default class NavBarUserMenu extends Component {
    logOut(){
        sessionStorage.clear();
        axios.get('/api/logout')
        .then((response) => {})
        .catch((err) => {})
    }

    render(){
        let name = sessionStorage.getItem('name');
        return (
            <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                    {name} <span className="caret"></span>
                </a>
                <ul className="dropdown-menu" role="menu">
                    <li>
                        <Link to='/home' >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to='/me/categories' >
                            My categories
                        </Link>
                    </li>
                    <li>
                        <Link to='/me/posts' >
                            My posts
                        </Link>
                    </li>
                    <li>
                        <Link to='/' onClick={this.logOut} >
                            Logout
                        </Link>
                    </li>
                </ul>
            </li>        
        );
    }
}
