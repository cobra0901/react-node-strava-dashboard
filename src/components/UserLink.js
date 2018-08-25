import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import '../styles/App.css';

const UserLink = React.createClass({

	render() {
		console.log(location)
		return(
		  <li>
			<Link to={{
			   pathname	: `${location.pathname}/${this.props.id}`,
			   search: '?show=all',
			   state: {
			   	  token: this.props.token
			   }
			  }}>
				  {this.props.nama}
			</Link>
		  </li>
		)
	}

})

export default UserLink;