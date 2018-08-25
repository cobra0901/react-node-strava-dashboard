import React from 'react';

import '../styles/App.css';

const TempCode = React.createClass({

	render () {
		return(
			<h2>
				Temporary login code: {this.props.value}
			</h2>
		);
	}
});


export default TempCode;