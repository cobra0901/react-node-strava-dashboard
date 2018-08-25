import React, { Component } from 'react';
import DistanceCurve from "./DistanceCurve";
import DistanceLoopCount from "./DistanceLoopCount";

class DistanceWidget extends Component {
	
	getSubText() {
		return `${this.props.origin}-${this.props.destination}`
	}

	render(){
		if (this.props.loop==='') {
            return <p>Loading...</p>;
        }

		return (
		  <div style={{display: 'inline-flex'}}>  
			 <DistanceCurve origin={this.props.origin} 
			 	destination={this.props.destination} 
			 	color={this.props.color}/>
	
			 <DistanceLoopCount value={this.props.loop} 
			 	subtext={this.getSubText()}/>

		  </div>
		)
	}
}

export default DistanceWidget;
