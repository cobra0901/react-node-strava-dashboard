import React, { Component } from 'react';
import { SimpleSelect} from 'react-selectize';


const DistanceCityOption = ({selected, changeCity}) => {

	let options = ['Bogor','Bandung','Jogja'];

	return (

		<SimpleSelect placeholder="Choose metric"
           defaultValue = {{label: options[selected], value: options[selected]}}
           onValueChange = {(newSelected) => 
           		changeCity (newSelected.value)
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

export default DistanceCityOption;

