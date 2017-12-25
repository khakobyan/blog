import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import NavBarComponent from './layouts/NavBarComponent';
import { HashRouter,Route } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import Home from './Home';
import MyCategories from './categories/MyCategories';
import MyPosts from './posts/MyPosts';
import ShowPost from './posts/ShowPost';

export default class Main extends Component {

    constructor(props){ 
        super(props);
        
        let isLogged = localStorage.getItem('isLogged');

        if (isLogged == 1) {
          isLogged = true;
        }else{
          isLogged = false;
        }

        this.state = {
            loggedIn: isLogged,
            isAddCategory: false
        };

        this.onHandleLogin = this.onHandleLogin.bind(this);
        this.onHandleLogout = this.onHandleLogout.bind(this);
        this.onHandleAddCategory = this.onHandleAddCategory.bind(this);
    }


    onHandleLogin(isLogged){
        this.setState({loggedIn: isLogged});
    }

    onHandleLogout(){
      this.setState({loggedIn: false});
    }

    onHandleAddCategory(){
      this.setState({
        isAddCategory: !this.state.isAddCategory
      });
    }

    render() {
        return (
            <HashRouter >
                <div>
                  <NavBarComponent isLogged={this.state.loggedIn}/>
                  <hr/>
                  <Route path="/login" component={Login}/>
                  <Route path="/registration" component={Register}/>
                  <Route path="/home" component={Home}/>
                  <Route path="/me/categories" component={MyCategories} />
                  <Route path="/me/posts" component={MyPosts} />
                  <Route path="/posts/:id" component={ShowPost} />
                </div>
            </HashRouter>

        );
    }
}