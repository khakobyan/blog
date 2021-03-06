import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import { HashRouter,Route } from 'react-router-dom';

export default class Categories extends Component {
    constructor(props){
        super(props);
        this.state ={
            categories: []
        }
    }
    componentWillMount(){
        axios.get('/api/categories').then((response) => {
            const categories = response.data.resource;
            this.setState({categories: categories});
        }).catch((error) => {

        })
    }

    render() {
        return(
            <div>
                {
                    this.state.categories.map((value,index) => {
                        return <li key={index} className="list-group-item text-center" >{value.name}</li>
                    })
                }
            </div>
        )
    }
}
