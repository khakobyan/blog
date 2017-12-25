import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddPostButton extends Component {
	render() {
		return (
			<div className="modal fade" id="add_post_modal" role="dialog" >
				<div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <label htmlFor="exampleInputEmail1">Add Post</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Title"
                                name={this.props.post_title} onChange={this.props.getPostTitle} required/><br/>
                            <textarea className="form-control" rows="6" value={this.props.post_text} onChange={this.props.getPostText} placeholder="Text"></textarea><br/>
                            <select onChange={this.props.changeSelect} value={this.props.selected_category} className="form-control">
                            	<option>Select Category</option>
                               	{
                                    this.props.show_categories.map((value, index) => { 
                                        return (
                                            <option key={index} value={value.id}>{value.name}</option>
                                        );
                                    })    
                                }
                            </select><br/>
                            <input name='image'  type="file"  id='image' onChange={this.props.getPostImage} className="form-control-file" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={this.props.submitForm} className="btn btn-primary cols-sm-3" data-dismiss="modal">Save</button>
                            <button type="button" className="btn btn-secondary cols-sm-3" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}