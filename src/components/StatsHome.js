import React from 'react';

import {Route, Switch, Link} from 'react-router-dom';
import '../styles/App.css';

import Stats from './NewStats';
import UserList from './UserList';
import SignupModal from './SignupModal';
import Signup from './Signup';

//const StatsHome = ({ match}) => { // changed with createClass

const StatsHome = React.createClass({

	
	componentWillUpdate(nextProps) {
		console.log('going to change Props..')
		console.log(nextProps)
	    const { location } = this.props
	    // set previousLocation if props.location is not modal
	    if (nextProps.history.action !== 'POP' &&
	      (!location.state || !location.state.modal)) 
	    {
	    	this.previousLocation = location
	    }
 	},

	render() {

		console.log(this.props.match)

		const { location } = this.props
	    const isModal = !!(
	      location.state &&
	      location.state.modal &&
	      this.previousLocation !== location // not initial render
	    )
	
		// karena skarang udah React class, put retur under render 
			return( // ditambahin nih karena ada isModal
				<div>
			    <Switch location={isModal ? this.previousLocation : location}>
				    //define different Views, depending of routes..
				    //Route #1..
				    <Route exact path={this.props.match.url} render={()=> (<div>
				    	<h2> Empty Page. No Athletes selected!</h2>
				    	<UserList />

				    	<br/>
				    	<Link
					        to={{
					          pathname: '/stats/signup',
					          state: { modal: true }
					        }}
					      >
					        <p><u>Signup</u></p>
					      </Link>
				    </div>
				    )} />

				    //Route #2
				    <Route path='/stats/signup/' component={Signup}/>

				    //Route #2b (this original direct to athlete got pushed because now there's stats-signup)..
				    <Route path={`${this.props.match.url}/:athlete_id`} component={Stats}/>

				    <Route render={()=> (<h2> Stats missing.</h2>)}/>
				</Switch>

				
				{isModal ? <Route path='/stats/signup/' component={SignupModal} /> : null}

				</div>
			)
		// end of return Render
	}
})

export default StatsHome;