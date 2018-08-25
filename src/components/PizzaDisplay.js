import React, { Component } from 'react';

// Import styling
import '../styles/NumberDisplay.css';

class PizzaDisplay extends Component {
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
            	src={require('../assets/if_Food_C219_2427861_small.png')} alt="Pizza" />
        );
    }
}

// Enforce the type of props to send to this component
PizzaDisplay.propTypes = {
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    value: React.PropTypes.number
}

export default PizzaDisplay;