import React, { Component } from 'react';
import BurgerDisplay from '../components/BurgerDisplay';

// Import styling
import '../styles/NumberDisplay.css';
import '../styles/NumberWidget.css';

class BurgerDisplayDelayed extends Component {

    render() {
    	var last = -100, addition = 330;

    	return (
    		<div>
    		{ 
    			this.props.items.map(function (satuan, idx){

    				// make sure its time of show gradually increase
    				last = last + addition;
					addition=addition/1.28;
    				
    				return (
    					<div className="mealItem" >
    						<BurgerDisplay wait={last} />
    					</div>
    				);

    			})
			}
    		</div>
		)
        
    }
}

// Enforce the type of props to send to this component
BurgerDisplayDelayed.propTypes = {
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    value: React.PropTypes.number
}

export default BurgerDisplayDelayed;