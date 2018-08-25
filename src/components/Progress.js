import React, { Component } from 'react';

// Import styling
import '../styles/Progress.css';

class Progress extends Component {

    state = {
        currentProg: 0,
        targetProg: (this.props.value/this.props.max)*75
    }

    componentDidMount(){
        console.log(this.state.targetProg)

        // let value = this.props.value

        // // Limit value to min and max bounds
        // if (value < this.props.min) {
        //     value = 0;
        // } else if (value > this.props.max) {
        //     value = this.props.max;
        // }

        this.progressMove()

    }

    progressMove(){
        setTimeout (() => {
            let nextStep = this.increase();
            this.setState({
                currentProg: nextStep
            })

            if (nextStep <= this.state.targetProg)
                this.progressMove()
        }, 10)
        
    }

    increase(){
        return (parseInt(this.state.currentProg) + 2)
    }

    render() {
        return (
            // Adjust progress bar using inline styles
            // let innerWidthStyle = { width: `${(value / this.props.max) * 75}%` };
        
            <div className="Progress">
                <div className="inner" style={{width: this.state.currentProg+"%"}} />
            </div>
        );
    }
}

// Provide a default value when one isn't supplied
Progress.defaultProps = {
    value: 0
}

// Enforce the type of props to send to this component
Progress.propTypes = {
    min: React.PropTypes.number.isRequired,
    max: React.PropTypes.number.isRequired,
    value: React.PropTypes.number.isRequired
}

export default Progress;