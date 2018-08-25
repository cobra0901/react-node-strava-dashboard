import React from 'react';
import CountUp from './NumberCountUp';

const DistanceLoopCount = props => {

		console.log ('number of loop: ' + props.value);
		
		return(
			<div style={{marginTop:'164px', marginLeft:'8px'}}>
				<h1>
					<CountUp start={0} end={props.value} duration='justify' increase={0.1} decimals />x
				</h1>
				<h3 
				  	style={{
					  verticalAlign: 'bottom',
					  marginTop: '-15px'
				  	}}
				>
					{props.subtext}
				</h3>
			</div>
		);
}


export default DistanceLoopCount;