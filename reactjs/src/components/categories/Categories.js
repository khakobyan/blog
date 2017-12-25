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
            this.setState({categories: Object.values(response.data)[0]});
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
