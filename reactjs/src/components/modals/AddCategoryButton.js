import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddCategoryButton extends Component {
    render() {
        return (
            <div>
                <div id="myModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Write Category Name</h4>
                            </div>
                            <div className="modal-body">                        
                                <input type="text" className="form-control col-sm-6" name="category_title" onChange={this.props.getName} value={this.props.name} />
                            </div><hr/>
                            <div className="modal-footer">
                                <input className="btn btn-default col-sm-3" type="submit" value="Create" onClick={this.props.addCategory} data-dismiss="modal" />
                                <div className="col-sm-6"></div>
                                <button className="btn btn-default col-sm-3" type="button" data-dismiss="modal">Close</button>  
                            </div>	
                        </div>
                    </div>
                </div>
            </div>          
        );
    }
}