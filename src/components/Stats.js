import React, { Component } from 'react';

import NumberWidgetContainer from '../components/NumberWidgetContainer';
/*import GraphWidgetContainer from '../components/GraphWidgetContainer';*/
import ActivitiesWidgetContainer from '../components/ActivitiesWidgetContainer';
import ProfileWidgetContainer from '../components/ProfileWidgetContainer';
import MealsWidgetContainer from '../components/MealsWidgetContainer';

import '../styles/App.css';
import Home from './Home';

class Stats extends Component {
	
    render() {
  
    console.log(this.props.match.params.state)

      return (
		<div className="App">
  
			<ActivitiesWidgetContainer href="" heading="Activities (Last 6)" rowspan={3} />

			<NumberWidgetContainer href="" target="count" metric="" heading="Number of Rides (on 2017)" />
			
			<ProfileWidgetContainer href="" heading="Profile" colspan={2} rowspan={2} />
			
			<NumberWidgetContainer href="" metric="km" convertUnit="1000" target="distance" heading="Total KM ridden" />
			
			<NumberWidgetContainer href="" metric="hours" convertUnit="3600" target="moving_time" heading="Total Time Spent on saddle" />


			<MealsWidgetContainer href="http://localhost:3001/strava/calories" metric="kg" convertUnit="" target="total_cal" heading="Calories Burned (this month)" colspan={2} rowspan={1}/>
			
			<div>
			 <center>
			  <img src={require('../assets/api_logo_pwrdBy_strava_horiz_light.png')} alt="strava-logo" />
			 </center>
			</div>

		</div>
      );
    }
}

export default Stats;