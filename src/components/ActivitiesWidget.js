import React, { Component } from 'react';

// Import components
import Widget from '../components/Widget';
import ListDisplay from '../components/ActivitiesDisplay';
import ListItem from '../components/ActivitiesItem';

// Import styling
import '../styles/ListWidget.css';

class ListWidget extends Component {
    //Sort items in descending order
    sortListItems() {
        let sortedItems = this.props.listItems.slice();
        return sortedItems.sort((a, b) => {
            if (a.distance > b.distance) {
                return -1;
            } else if (a.distance < b.distance) {
                return 1;
            }
            return 0;
        });
    }

    // Decide whether to show widget
    showWidget() {
        let sortedItems = this.sortListItems();

        // Show loading indicator while initial data is being fetched
        if (this.props.listItems.length === 0) {
            return null;
        }

        // Get min/max values for progress bar
        let min = 0;
        let max = sortedItems[this.props.qty-1].distance;

        return (
            <ListDisplay>
                {/* Add a ListItem for each piece of data */}
                {this.props.listItems.splice(0,this.props.qty).map((item, index) => 
					<ListItem index={index+1} id={item.id} key={item.id} label={item.name} value={item.distance} min={min} max={max} tanggal={item.start_date_local} />
					)
				}
            </ListDisplay>
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
ListWidget.propTypes = {
    heading: React.PropTypes.string,
    colspan: React.PropTypes.number,
    rowspan: React.PropTypes.number,
    loading: React.PropTypes.bool.isRequired,
    listItems: React.PropTypes.arrayOf(React.PropTypes.object)
}

export default ListWidget;