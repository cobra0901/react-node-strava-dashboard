import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';

import '../styles/App.css';

class Home extends Component {
    render() {
      return (
		<div className="Home">
			<h3 className='home_link'>
				<a href='http://posts.kayouh.org/'>
					Blog
				</a>
			</h3>

			<Link to='/stats'>
				<h3 className='home_link'>
					My Stats
				</h3>
			</Link>
		

		</div>
      );
    }
}

export default Home;