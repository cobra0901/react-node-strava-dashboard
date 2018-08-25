import React, { Component } from 'react';

// Import components
import Widget from '../components/Widget';

// Import styling
import '../styles/ListWidget.css';

class ProfileWidget extends Component {
    // Decide whether to show widget
    showWidget() {

        // Show loading indicator while initial data is being fetched
        if (this.props.profileDetails.length === 0) {
            return null;
        }
		let profile = this.props.profileDetails
        return (
			<div>
				<center>
					<img src={profile.profile} alt="strava-avt"/>
					<br />
					<h3>{profile.firstname} {profile.lastname}</h3>
					<h5><b>{profile.username}</b></h5>
					<br />
					<table>
			<center>
						<tr>
							<td><h5> Join Date:</h5></td>
							<td width="32%"><h5>Bikes Owned</h5></td>
							<td><h5>Representing</h5></td>
						</tr>
						<tr>
							<td>{profile.created_at}</td>
							<td>{profile.bikes.length}</td>
							<td>{profile.city}, {profile.state}</td>
						</tr>
			</center>
					</table>
				</center>
			</div>
        );
    }

    render() {
        return (
            // Wrap the list display component in the generic wrapper
            <Widget heading={this.props.heading} colspan={this.props.colspan} rowspan={this.props.rowspan} loading={this.props.loading} >
                <div className="ListWidget">
                    {/* Conditionally show the widget */}
                    {this.showWidget()}
                </div>
            </Widget>
        );
    }
}

// Enforce the type of props to send to this component
ProfileWidget.propTypes = {
    heading: React.PropTypes.string,
    colspan: React.PropTypes.number,
    rowspan: React.PropTypes.number,
    loading: React.PropTypes.bool.isRequired,
	// if i send object, instead of array, i have to change this
    //profileDetails: React.PropTypes.arrayOf(React.PropTypes.object)
	profileDetails: React.PropTypes.object
}

export default ProfileWidget;