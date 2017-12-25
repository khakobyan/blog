import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EditCategoryButton extends Component {
	render() {
        return (
        	<div className="container">
            	<div id={this.props.modal_id+'edit'} className="modal fade" role="dialog">
                	<div className="modal-dialog">
                    	<div className="modal-content">
                        	<div className="modal-header">
                            	<h4 className="modal-title text-center">EDIT CATEGORY</h4>
                        	</div>
                        	<div className="modal-body" id={this.props.modal_id} >   
                            	<input type="text"  value={this.props.old_name} onChange={this.props.getName} id="title" name="title" className="form-control" autoFocus />
                            </div>
                            <div className="modal-footer">
                            	<input type="submit" onClick={this.props.editCategory} value="Edit" id="edit-click" data-dismiss="modal" className="btn btn-default col-sm-3" />
                            	<div className="col-sm-6"></div>
                            	<button type="button" data-dismiss="modal" className="btn btn-default col-sm-3">Close</button>
                        	</div>
                    	</div>
                	</div>
            	</div>	
            </div>
        );
	}
}