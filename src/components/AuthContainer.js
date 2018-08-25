import React from 'react';

import '../styles/App.css';
import TempCode from './TempCode';
import TokenCode from './TokenCode';
import {Redirect} from 'react-router-dom';
import axios from 'axios';


const AuthContainer = React.createClass({

	getInitialState (){
		return {
			token: '',
			tokenRetrieved: false,
		}
	}, // remember the comma if using createClass
	
	getDefaultProps (){
		return {

		};
	}, 
	
	componentDidMount (){
		let url = 'https://www.strava.com/oauth/token'
		let auth_params = {
			code: this.props.temp_code,
			client_id: '21292',
			client_secret: '59d6fee2ef41b7df522c26952790ea14a17b8c22'
		}

        // Post request ..
        return axios.post(url, auth_params)
            .then(response => {
            	console.log(response)
            	// put Verified User and his token to userList
            	this.addToDatabase (response.data) // remember to USE 'this'
            	// update TokenCode's value
            	this.setState ({token: response.data.access_token})
			}).catch(failure => {
				console.log (failure)
			});
	},

	addToDatabase (user) {
		// rapikan data before added to DB
		let newEntry = {
			athlete_id: user.athlete.id,
			athlete_name: user.athlete.firstname + ' ' + user.athlete.lastname,
			profile_pic: user.profile,
			login_code: this.props.temp_code,
			token: user.access_token
		}

		let url = "http://localhost:3001/user";
		return axios.post(url, newEntry)
            .then(response => {
            	console.log(response)
            	// back to List of Stats, by setting tokenRetrieved state
            	this.setState({tokenRetrieved: true});
			}).catch(failure => {
				console.log (failure)
			});


	},

	render () { // remember this isn't FUNCTIONAL Components that doesnt need render.. (like StatsHome.js)
		
		if (this.state.tokenRetrieved)
			return (
				<Redirect to="/stats" />
			)

		return(
			<div>
				<TempCode value={this.props.temp_code} />
				<TokenCode value={this.state.token} />
								
			</div>
		);
	}
});

export default AuthContainer;