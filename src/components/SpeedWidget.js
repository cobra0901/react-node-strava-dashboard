import React, { Component } from 'react';
import ReactSpeedometer from "react-d3-speedometer";

class SpeedWidget extends Component {
	
	render(){
		if (this.props.avgSpeed=='') {
            return <p>Loading...</p>;
        }

		return (
				<div style={{textAlign:'center', marginTop:'3%'}}>
				  <ReactSpeedometer
					  fluidwidth
					  maxValue={100}
					  value={this.props.avgSpeed}
					  needleColor="lightbrown"
					  needleTransitionDuration={12000}
					  needleTransition="easeElastic"
					  startColor="#eebbbb"
					  segments={6}
					  endColor="maroon"
					  textColor="orange"
					  height={200}
				  />
				</div>
		)
	}
}

export default SpeedWidget;
