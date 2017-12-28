import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import { HashRouter,Route } from 'react-router-dom';
import AddCategory from './AddCategory';
import DeleteCategory from './DeleteCategory';
import EditCategory from './EditCategory';

export default class MyCategories extends Component {
    constructor(props){
        super(props);
        this.state ={
            categories: []
        }
        this.addCategory = this.addCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.editCategory = this.editCategory.bind(this);
    }
    componentWillMount(){
        axios.get('/api/me/categories').then((response) => {
            const categories = response.data.resource;
            this.setState({categories: categories});
        }).catch((error) => {

        })
    }
    addCategory(category) {
        let categories = this.state.categories;
        categories.push(category);
        this.setState({categories});
    }
    deleteCategory(category) {
        let categories = this.state.categories;
        categories.map((value,index) => {
            if (value.id == category) {
                categories.splice(index,1);
            }
        })
        this.setState({categories});
        this.props.deleteCategory(category);
    }
    editCategory(category) {
        let categories = this.state.categories;
        let newCstegorices = categories.map((value, index) => {
            if(value.id == category.id) {
                return value.name = category.name;
            }
            return value;
        })
        this.setState({categories});
    }
    render() {
        return(
            <div className="container">
                <h2 className="text-center">My Categories</h2>
                <AddCategory addCategory={this.addCategory}/>
                <ul className="list-group  center-block category-list">
                    <div> 
                        {
                            this.state.categories.map((value,index) => {
                                return (
                                    <li key={index} className="list-group-item text-center col-sm-12" >
                                        <div className="col-sm-6">{value.name}</div>
                                        <div className="col-sm-3">
                                            <EditCategory id={value.id} editCategory={this.editCategory} old_name={value.name}/>
                                        </div>
                                        <div className="col-sm-3">
                                            <DeleteCategory id={value.id} deleteCategory={this.deleteCategory}  />
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
