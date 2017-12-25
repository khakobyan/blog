import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DeletePostButton extends Component {
	render() {
		return (
			<div className="container">
      			<div className="modal fade" id={this.props.modal_id+'delete'} role="dialog">
        			<div className="modal-dialog">
          				<div className="modal-content">
            				<div className="modal-header">
              					<h4 className="modal-title text-center">DELETE POST?</h4>
            				</div>
            				<div className="modal-footer  text-center">
                  				<button type="submit" className="btn btn-default col-sm-3 submit" data-dismiss="modal" onClick={this.props.deletePost}>YES</button>
              					<div className="col-sm-6"></div>
                				<button type="button" className="btn btn-default col-sm-3" data-dismiss="modal">NO</button>
            				</div>
          				</div>
        			</div>
	    		</div>
	    	</div>	
		)	
	}
}