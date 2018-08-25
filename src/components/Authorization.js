import React from 'react';

import {Route, Switch, Link} from 'react-router-dom';
import '../styles/App.css';

import AuthContainer from './AuthContainer';

import {parse} from 'querystringify'; // to help transverse the Query String params returned from Strava


const Authorization = ({ props, match,location }) => {

	console.log(location)
	const query_strings = parse (location.search.substr(1))
	
	return(
		<AuthContainer temp_code={query_strings.code}/>
	)
}


export default Authorization;