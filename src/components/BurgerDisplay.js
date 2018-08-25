import React, { Component } from 'react';

// Import styling
import '../styles/NumberDisplay.css';

class BurgerDisplay extends Component {
	state = {
		visibility: "hidden"
	}

	componentWillMount () {
		if(this.props.wait!=undefined) {
	        var that = this;
	        setTimeout(function() {
	            that.show();
	        }, that.props.wait);
	    }
    }
    
    show() {
        this.setState({visibility : "visible"});
    }

    render() {
        return (
            <img style={{"visibility": this.state.visibility}} 
            	src={require('../assets/if_Food_C206_2427852_small.png')} alt="burger" />
        );
    }
}

// Enforce the type of props to send to this component
BurgerDisplay.propTypes = {
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    value: React.PropTypes.number
}

export default BurgerDisplay;