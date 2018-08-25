import React from 'react';
import MtSvgLines from 'react-mt-svg-lines'; 

const DistanceCurve = ({origin, destination, color} ) => {

		console.log (`drawing curve from ${origin} to ${destination}..`);
		
		// `animate` must have diff value to be re-Rendered.. 
		return(
			<MtSvgLines animate={ String( Date.now() ) } duration={ 1700 }>
			  <svg viewBox="75 73 350 350" 
			  	   style={{height: '250px', filter: 'drop-shadow(2px 3px 4px rgba(48,48,48,.95))'}}
			  >
				<path stroke={color} strokeWidth="22" fill="none" d="M104,258 C108,111 397,73 405,352" />
			  </svg>
			</MtSvgLines>
		);
}


export default DistanceCurve;