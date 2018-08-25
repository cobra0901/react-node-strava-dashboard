import React, { Component } from 'react';

// Import request module
import axios from 'axios';

// Import components
import NumberWidget from '../components/NumberWidget';

class NumberWidgetContainer extends Component {
    constructor() {
        super();

        // Set initial state
        this.state = {
            loading: false,
            min: undefined,
            max: undefined,
            value: undefined
        }

        // Bind function to refer to component
        this.getData = this.getData.bind(this);
    }

    // Fetch data when the component is added
    componentDidMount() {
        this.getData().then(_ => {
            // Re-fetch every minute
            //this.interval = setInterval(this.getData, 60000);
        });
    }

    // Fetch new data
    getData() {
		console.log(location)
        console.log(process.env)

		let url = this.props.href !== '' ? this.props.href : `${process.env.REACT_APP_STRAVA_API_STATS_URL}?athlete_id=${this.props.athlete_id}&_id=${this.props.token}`

        // Tell the Widget component we're currently loading
        this.setState({ loading: true });

        // Fetch data
        return axios.get(url)
            .then(response => {
                // Build a new state
                let newState = { loading: false };

				// getting the Year-to-date statistics
				let stats = response.data.ytd_ride_totals;

				// getting the needed properties
				newState.value = stats[this.props.target]
				
				// to convert into necessary metric
				if (this.props.convertUnit)
				{
					newState.value = (newState.value / this.props.convertUnit)
					newState.value = Math.floor(newState.value)
				}
					
                // Update state with data
                this.setState(newState);
            })
            .catch(error => {
                // At least tell the Widget component we have stopped loading
                console.log(error);
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            // Render the number widget
            <NumberWidget heading={this.props.heading} colspan={this.props.colspan} rowspan={this.props.rowspan} min={this.state.min} max={this.state.max} value={this.state.value} loading={this.state.loading} metric={this.props.metric}/>
        );
    }
}

// Enforce the type of props to send to this component
NumberWidgetContainer.propTypes = {
    heading: React.PropTypes.string,
    colspan: React.PropTypes.number,
    rowspan: React.PropTypes.number,
	target: React.PropTypes.string,
    href: React.PropTypes.string.isRequired,
	metric: React.PropTypes.string
}

export default NumberWidgetContainer;