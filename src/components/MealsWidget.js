import React, { Component } from 'react';

// Import components
import Widget from '../components/Widget';
import BurgerDisplay from '../components/BurgerDisplay';
import BurgerDisplayDelayed from '../components/BurgerDisplayDelayed';
import PizzaDisplay from '../components/PizzaDisplay';
import PizzaDisplayDelayed from '../components/PizzaDisplayDelayed';
import Progress from '../components/Progress';
import Repeat from 'react-repeat-component';
import CountUp from '../components/NumberCountUp';

//Import styling
import '../styles/NumberWidget.css';

class MealsWidget extends Component {

	// cannot work if Class extend other class...
	/*
	getDefaultProps() {
		return {
			foodArr: []
		}
	}
	*/

	state = {
		last: 0,
		addition: 1200,
		factor: 1.4
	}

	static defaultProps = {
		foodArr: [],
		last: 0,
		addition: 1200,
		factor: 1.4

	}


    // Decide whether to show widget
    showWidget() {
        // Show loading indicator while initial data is being fetched
        if (this.props.value === undefined || this.props.loading == true) {
            return <p>Loading...</p>;
        }
		
		// cannot use `foodArr = []`
		this.props.foodArr.length = 0

		return this.renderFood()
    }


    render() {
        return (
            // Wrap the number display component in the generic wrapper
            <Widget className='mealsRow' optionsHandler={(p) => this.props.optionsHandler(p)} periodOptions={['month', 'week', 'year']} heading={this.props.heading} colspan={this.props.colspan} rowspan={this.props.rowspan} loading={this.props.loading}>
                {this.showWidget()}
            </Widget>
        );
    }

    populateFood = (type, foodArr) => {
    	console.log(foodArr)

    	let last = 0, addition = 1000

		foodArr.map(function(satuan, idx, array){
			//console.log(idx + '--' + addition + '--' + last)

			// setTimeout(()=>{
				return (
					<div className="mealItem" >
						<BurgerDisplay key={satuan.id}/>
					</div>
				)
			// }, last)

			last = last + addition;
			addition=addition/1.4;
			
		})
    	
    }

    // funny how `renderFood() {` will return unidentified props Value
    renderFood = value => {
    	let burgerCount = Math.floor( this.props.value / 550 )
		let pizzaCount = Math.floor( this.props.value / 300 )
	
    	for(let i=0; i<burgerCount; i++){
			console.log('adding burger icon...')
			this.props.foodArr.push ({id:i, foodType: 'burger'});
		}

		for(let i=0; i<pizzaCount; i++){
			console.log('adding pizzas icon...')
			this.props.foodArr.push ({id:i, foodType: 'pizza'});
		}
		
		console.log(this.props)
        // start displaying element to HTML
		return (
			/*
			<Repeat times={burgerCount}>
			{(i) => 
				<div className="mealItem" key={i}>
					<BurgerDisplay />
				</div>
			}
			</Repeat>
			*/
			
			<div>
				<h1 style={{
						float:'right',
						marginTop: '-27px',
						paddingBottom:'3px',
						marginRight: '2%',
						color: '#bd784e' /*#d07f57*/,
						//textShadow: '1px 2px 4px #000000aa',
						//opacity: '0.9',
						textDecoration: 'underline'
					}}
				>
					<CountUp start={0} end={this.props.value} duration='justify' fontSize={38} > <span>Calories</span> </CountUp>
				</h1>

				<h2 style={{marginTop:"30px"}}> Equals to:</h2><br/>
				<div>
						<BurgerDisplayDelayed items={this.props.foodArr.filter(function(satuan) {
								return satuan.foodType == 'burger';	
							})} />

					{ /*

						this.props.foodArr.filter(function(satuan) {
							return satuan.foodType == 'burger';	
						})
		
						.map(function(satuan, idx, array){
								return (
									<div className="mealItem" >
										<BurgerDisplay key={satuan.id}/>
									</div>
								)
							}, 500)
							
						})
					  */ 
					}

				<h4 className="food_name" style={{marginTop: "5px", paddingLeft: "6px"}}><u>{burgerCount} <i>Big Macs</i></u></h4> 
					
				</div>

				<h3 className="center_txt" style={{marginTop: "33px", fontSize: '1.6em', marginBottom: "24px", color:"#e96666", marginLeft: "2px"}}>Or...</h3>

				<div>
						<PizzaDisplayDelayed items={this.props.foodArr.filter(function(satuan) {
								return satuan.foodType == 'pizza';	
						})} />
					
					{
					/*
					this.props.foodArr.filter(function(satuan) {
						return satuan.foodType == 'pizza';	
					})
		
					.map(function(satuan, idx, array){
							return (
								<div className="mealItem" >
									<PizzaDisplay key={satuan.id}/>
								</div>
							)
					 })
					*/
					}
				</div>
				<h4 className="food_name" style={{marginTop: "10px", paddingLeft: "6px"}}><u>{pizzaCount} slices of pizza</u></h4> 

			</div>
		)
    }
}

// Enforce the type of props to send to this component
MealsWidget.propTypes = {
    heading: React.PropTypes.string,
    colspan: React.PropTypes.number,
    rowspan: React.PropTypes.number,
    loading: React.PropTypes.bool.isRequired,
    min: React.PropTypes.number,
    max: React.PropTypes.number
}

export default MealsWidget;