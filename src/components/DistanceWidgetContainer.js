import React, { Component } from 'react';

import Widget from "./Widget";
import DistanceWidget from "./DistanceWidget";
import DistanceMetricOption from "./DistanceMetricOption";
import DistanceCityOption from "./DistanceCityOption";

import axios from 'axios';

class DistanceWidgetContainer extends Component {

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
			metric: [
				{
					unit: 'km',
					convertUnit: 1000
				},
				{	
					unit: 'mile',
					convertUnit: 1609.34
				}
			],
			destination: [
				{	
					city: 'Bogor',
					distance: {
						km: 80,
						mile: 50
					},
					color: '#aa4444'
				},
				{
					city: 'Bandung',
					distance: {
						km: 200,
						mile: 125
					},
					color: '#44aaaa'
				},
				{
					city: 'Jogja',
					distance: {
						km: 400,
						mile: 250
					},
					color: '#bb55bb'
				},
			],
			selectedCityIdx: 2,
			selectedMetricIdx: 0,
			calculatedLoop: null
		}

		this.fetchData = this.fetchData.bind(this);
	}

	static defaultProps = {
		displayTotalDistance: true
	}

	componentDidUpdate(nextProps, nextState){
		// only update loop count when destination is changed..
		if (nextState.selectedCityIdx != this.state.selectedCityIdx)
			this.calculateLoopCount(this.state.distance);
	}

	
	componentDidMount() {
		this.fetchData() // kickStart it all!!
	}


    fetchData() {
        // Show loading indicator while initial data is being fetched
        this.setState({ loading: true });

        // Fetching speed data
        let url = `${process.env.REACT_APP_STRAVA_API_STATS_URL}?_id=${this.props.token}&athlete_id=${this.props.athlete_id}`;

        return axios.get(url)
            .then(response => {
                // Update state with data
                this.setState({ 
                	loading: false,
                	distance: response.data.ytd_ride_totals.distance
                 }); 

                // Strava API returns distance in meter..
                //this.convertMetric (response.data.ytd_ride_totals.distance);
                this.calculateLoopCount (this.state.distance)

            })
            .catch(error => {
                // At least tell the Widget component we have stopped loading
                console.log(error);
                this.setState({ loading: false });
            });
    }

    convertMetric(dist) {

		// getting the metric chosen by user
		let metricUsed = this.state.metric[this.state.selectedMetricIdx];

		// convert the distance into necessary metric
		let convertedDistance = parseInt(dist) / metricUsed.convertUnit;
		console.log ('================' + convertedDistance)
			
        // Update state with real distance
        /*
        this.setState({
        	distance: convertedDistance,
        });
        */

        // count how many loop we've been travelling..
        //this.calculateLoopCount(this.state.distance);

        return convertedDistance;
    }

	calculateLoopCount(distance) {
		
		console.log('re-calculcate loop number..')
		let selectedCity = this.state.destination[this.state.selectedCityIdx]
		
		let calculatedLoop = this.convertMetric(distance) / selectedCity.distance[this.state.metric[this.state.selectedMetricIdx].unit]
		
		this.setState ({
			calculatedLoop: calculatedLoop.toFixed(2)
		});

	}

    render() {
        return (
        	<Widget loading={this.state.loading}
        		 heading={this.props.heading} colspan={this.props.colspan} 
        		 rowspan={this.props.rowspan}>
				
				<DistanceMetricOption selected={this.state.selectedMetricIdx} changeMetric={(newVal)=>this.setState({selectedMetricIdx: newVal})} />
				
				<DistanceCityOption selected={this.state.selectedCityIdx} changeCity={(newVal)=>this.setState({selectedCityIdx: newVal})} />
				
				<DistanceWidget origin="Jakarta"
					destination={this.state.destination[this.state.selectedCityIdx].city}
					loop={(!this.state.calculatedLoop) ? '' : this.state.calculatedLoop } 
					metric={this.state.metric[this.state.selectedMetricIdx].unit} 
					color={this.state.destination[this.state.selectedCityIdx].color}
					legend={this.props.displayTotalDistance} />

			</Widget>			
        );
    }
}

export default DistanceWidgetContainer;