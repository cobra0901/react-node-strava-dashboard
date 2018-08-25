import React, { Component } from 'react';

// Import styling
import '../styles/NumberDisplay.css';

class NumberDisplay extends Component {
    render() {
        return (
            <img src="../assets/if_Burger_653249.png" alt="Placeholder Image" />
        );
    }
}

// Enforce the type of props to send to this component
NumberDisplay.propTypes = {
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    value: React.PropTypes.number
}

export default NumberDisplay;