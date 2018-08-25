import React from 'react';
import ReactDOM from 'react-dom';
import StatsHome from './components/StatsHome';
import Authorization from './components/Authorization';
import Home from './components/Home';
import ModalGallery from './components/ModalGallery';
import './index.css';

import {Route, Switch, BrowserRouter, hashHistory, Link, Redirect} from 'react-router-dom';

console.log(process.env)

ReactDOM.render(
	(<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Home} /> 
			<Route path='/stats/' component={StatsHome} />
			<Route path='/authorization/' component={Authorization} />
			<Route path='/ModalGallery' component={ModalGallery} />
			<Route render={()=> (<h2> 404 Not Found.</h2>)}/>
		</Switch>
	</BrowserRouter>
  	)
  ,
  document.getElementById('root')
);
