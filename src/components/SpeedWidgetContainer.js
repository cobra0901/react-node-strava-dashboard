import React, { Component } from 'react';

import Widget from "./Widget";
import SpeedWidget from "./SpeedWidget";

import axios from 'axios';

class SpeedWidgetContainer extends Component {

	// cannot work if Class extend other class...
	/*
	getDefaultProps() {
		return {
			foodArr: []
		}
	}
	*/

	constructor() {
		super();

		this.state = {
			metric: 'kph',
			avg: ''
		}

		this.fetchData = this.fetchData.bind(this);
	}

	static defaultProps = {
		displayNumber: true
	}

	componentwillUpdate(nextProps, nextState){
		console.log('received Average speed..')
	}

	componentDidMount() {
		//this.setState({ loading: true });
		this.fetchData() //.then(function(what){})
	}

    fetchData() {
        // Show loading indicator while initial data is being fetched
        this.setState({ loading: true });

        // Fetching speed data
        let url = `${process.env.REACT_APP_STRAVA_API_SPEED_URL}?_id=${this.props.token}&metric=${this.state.metric}`;

        return axios.get(url)
            .then(response => {
                // Update state with data
                this.setState({ loading: false, avg: response.data.avg}); //result axios dibungkus dalem data

            })
            .catch(error => {
                // At least tell the Widget component we have stopped loading
                console.log(error);
                this.setState({ loading: false });
            });

    }

    render() {
        return (
        	<Widget loading={this.state.loading}
        		 heading={this.props.heading} colspan={this.props.colspan} rowspan={this.props.rowspan}>
				
				<SpeedWidget avgSpeed={this.state.avg} legend={this.props.displayNumber}/>

			</Widget>			
        );
    }
}

export default SpeedWidgetContainer;