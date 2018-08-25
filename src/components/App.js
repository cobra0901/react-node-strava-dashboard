import React, { Component } from 'react';

import NumberWidgetContainer from '../components/NumberWidgetContainer';
/*import GraphWidgetContainer from '../components/GraphWidgetContainer';*/
import ActivitiesWidgetContainer from '../components/ActivitiesWidgetContainer';
import ProfileWidgetContainer from '../components/ProfileWidgetContainer';
import MealsWidgetContainer from '../components/MealsWidgetContainer';

import '../styles/App.css';

class App extends Component {
    render() {
      return (
		<div className="App">

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

export default App;