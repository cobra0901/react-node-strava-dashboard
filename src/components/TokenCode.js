import React from 'react';

import '../styles/App.css';

const TokenCode = React.createClass({

	render () {
		return(
			<h2>
				Returned Token code: {this.props.value}
			</h2>
		);
	}
});


export default TokenCode;