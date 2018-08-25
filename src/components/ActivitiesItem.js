import React, { Component } from 'react';

// Import components
import Progress from '../components/Progress';
import Moment from 'react-moment';
import CountUp from './NumberCountUp';

// Import styling
import '../styles/ListItem.css';

class ListItem extends Component {
    render() {
        return (
			<div>
            
            <div className="item_date">
                <h4> {this.props.index}. <Moment date={this.props.tanggal} format="dddd, DD MMM 'YY" /> </h4>
            </div>

            <li className="ListItem" style={{marginRight: '5px', marginTop: '-26px'}}>
                
                {/* Compare progress against others in the list */}
                <Progress min={this.props.min} max={this.props.max} value={this.props.value} />
                
                <div className="value" style={{marginLeft: '4px', marginRight:'7px', paddingRight:'0px'}}>
                    <CountUp start={0} 
                            end={Math.ceil(this.props.value/1000)} 
                            duration='fast'
                            delay={this.props.index * 200}> 
                        k 
                    </CountUp>
                </div>
            
            
                <div style={{paddingLeft:'20px', marginRight:'-16px', paddingTop:'5px'}} >
                    <a style={{fontSize:'17px'}}
                       href={`https://www.strava.com/activities/${this.props.id}`}>
                         {this.props.label}
                    </a>
                </div>
            </li>

			
			</div>
        )
    }
}

// Enforce the type of props to send to this component
ListItem.propTypes = {
    label: React.PropTypes.string,
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    value: React.PropTypes.number,
    index: React.PropTypes.number
}

export default ListItem;