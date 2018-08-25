import React, { Component } from 'react';

import '../styles/App.css';
import axios from 'axios';
import User from './UserLink';
import {Link} from 'react-router-dom';

class Stats extends Component {
	constructor(props){
		super(props);
		this.state = {
			users: [123]
		}
	}

	componentDidMount () {
		let url = "http://localhost:3001/users";
		return axios.get(url)
			.then(res => {
				this.setState ({users: res.data}); //remember to check its not just 'res'
			}).catch(err => {
				console.log (err)
			});
	}

	componentWillUpdate (nextProps, nextState) {
		console.log ('ada State baru:')
		console.log (nextState)
		console.log('re-render')
	}

	showList () {
		return(
		  <div>
		  <Link to={{
			   pathname	: '2345234',
			   search: '?show=all',
			   state: {
			   	  token: 686998768
			   }
			  }}>
				  this.props.nama
			</Link>

			{this.state.users.map(function(user, urut){
				return (
					<User key={urut} id={user.athlete_id} token={user.token} nama={user.athlete_name} />
				)
			})
			}
		  </div>
		)
	}

    render() {
      return (
		<ul>
			{this.showList()}
			
    		<li><a href="https://www.strava.com/oauth/authorize?client_id=21292&response_type=code&redirect_uri=http://localhost:3000/authorization&approval_prompt=force">
    			GET YOUR STAT ADDED HERE!</a>
    		</li>
    	</ul> 
      );
    }
}

export default Stats;