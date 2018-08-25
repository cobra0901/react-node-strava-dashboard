import React, { Component } from 'react';

// Import components
import Loading from './Loading';

//Import styling
import '../styles/Widget.css';

class Widget extends Component {
    constructor(props) {
        super(props);

        // Create inline styles to make grid elements span multiple rows/columns
        this.spanStyles = {};
        if (props.colspan !== 1) {
            this.spanStyles.gridColumn = `span ${props.colspan}`;
        }
        if (props.rowspan !== 1) {
            this.spanStyles.gridRow = `span ${props.rowspan}`;
        }
    }

    displayTopOptions() {
        return (
            <span style={{fontSize:'18px'}}>
            (
                {
                 this.props.periodOptions.map((period, idx) => {
                    if (idx != this.props.periodOptions.length-1)
                        var wall_separator = 'display'
                    else
                        var wall_separator = 'none'

                    console.log('--------------------------- ' + wall_separator)

                    return (
                        <span>
                            <a onClick={(e) => this.changePeriod(period,e)}>this {period}</a>
                            &nbsp;
                            <span style={{display: wall_separator}}>
                                | 
                            </span>
                        </span>
                    )
                 })
                }
            )
            </span>
        )
    }

    changePeriod = (p,e) => {
        console.log(p)
        this.props.optionsHandler(p);
    }

    render() {
        return (
            <div style={this.spanStyles} className="Widget">
                <div className="header">
                    <h2>
                        {this.props.heading}
                        &nbsp;&nbsp;
                        {this.props.periodOptions ? this.displayTopOptions() : "" }
                    </h2>
                    {/* Conditionally show the loading spinner */}
                    {this.props.loading ? <Loading /> : ""}
                </div>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

// Provide default settings for when they aren't supplied
Widget.defaultProps = {
    heading: "Unnamed Widget",
    colspan: 1,
    rowspan: 1
}

// Enforce the type of props to send to this component
Widget.propTypes = {
    heading: React.PropTypes.string,
    colspan: React.PropTypes.number,
    rowspan: React.PropTypes.number,
    children: React.PropTypes.element.isRequired
}

export default Widget;