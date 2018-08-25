import React, { Component } from 'react';
import { SimpleSelect} from 'react-selectize';


const DistanceMetricOption = ({selected, changeMetric}) => {

	let options = ['km','mile'];

	return (

		<SimpleSelect placeholder="Choose metric"
           defaultValue = {{label: options[selected], value: options[selected]}}
           onValueChange = {(newSelected) => 
           		changeMetric (newSelected.value)
           }
        >

        {
        	options.map( (option,idx) => {
        		return (
        			<option value={idx}>{option}</option>
        		)
        	})
        }

        </SimpleSelect>
	)	
}

export default DistanceMetricOption;

