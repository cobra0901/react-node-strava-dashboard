import React, {Component} from 'react';

// Import styling
import '../styles/NumberDisplay.css';

var speed = [
    {
        preset: 'fast',
        speed: 20
    },
    {
        preset: 'normal',
        speed: 200
    },
    {
        preset: 'slow',
        speed: 300
    },
    {
        preset: 'justify',
        speed: ''
    }
]


class NumberCountUp extends Component {

    constructor(props){
        super(props)

        this.loop = 0;

        this.increment = this.props.increase ? this.props.increase : 1

        this.delay = this.props.delay ? this.props.delay : 0

        this.state = {
            countStart: false,
            counter: this.props.start,
            max: this.props.end
        }
    }

    countUp(){
        var preset = speed.find((obj) => 
            obj.preset === this.props.duration
        )

        setTimeout (() => {
            this.setState({
                counter: this.increase()
            });

            this.loop++;
            //console.log('counter: ' + this.state.counter + ' | loop #' + loop + ' | increment: ' + this.increment);
        }, this.adjustSpeed(preset.speed))
    }

    increase() {
        if ( this.props.decimals ){
            var nextVal =  parseFloat(this.state.counter) + this.increment //without this, will be 0.010.01; with parseInt will be always 0.01 (because integer wil be 0)
            nextVal = nextVal.toFixed(2)
        }
        else {
            var nextVal = this.state.counter + this.increment
        }

        return nextVal;
    }

    adjustSpeed(mills) {
        return this.props.decimals ? ( this.isJustify() ? this.adjustOnDecimals() : (mills/5) )  :  ( this.isJustify() ? this.adjustOnBigNum() : mills);
    }

    adjustOnDecimals(){
        return (this.props.end < 1) ? (speed.find((obj) => 
            obj.preset === 'slow'
        ).speed / 2) : ( (this.props.end < 3) ? (speed.find((obj) => 
                obj.preset === 'normal'
            ).speed / 2) : (speed.find((obj) => 
                    obj.preset === 'fast'
                ).speed / 2) )
    }

    adjustOnBigNum(){
        // try fasten the speed if loop > 15

        return (this.loop < 15) ? (
            (this.props.end < 10) ? (speed.find((obj) => 
            obj.preset === 'slow'
        ).speed ) : ( (this.props.end < 100) ? (speed.find((obj) => 
                obj.preset === 'normal'
            ).speed / 2) : speed.find((obj) => 
                    obj.preset === 'fast'
                ).speed / 4)

        ) : ( this.loop % 4 == 0 ? this.changeIncrementForVeryBigNum() : 10 );
    }

    isJustify(){
        return (this.props.duration==='justify');
    }

    changeIncrementForVeryBigNum() {
        
        //console.log( 'accelerating on loop# ' + loop )
         
        // if ((this.state.max-this.state.counter) > this.state.max/2)
        if ((this.state.max-this.state.counter) > this.increment * 4 * 4 )
             this.accelerate()
        else
             this.deaccelerate()
    }

    accelerate() {
        this.increment = this.increment * 2;
        // console.log('accel to ' + this.increment)
        return 10;
    }

    deaccelerate(){
        if(this.increment>1) {
            this.increment = this.increment / 2;
            
            // console.log('decel to ' + this.increment)
            return 10;
        }
    }

    showCounter() {
        if (this.state.countStart) {
            return (
                <span className="value" style={this.props.fontSize!=undefined ? {fontSize: `${this.props.fontSize}px`} : {}} >
                    {this.state.counter} 
                    {this.props.children}
                </span>
            )
        }
    }

    componentDidMount() {
        setTimeout(()=>{
            this.setState({
                countStart: true
            });
        }, this.delay);
    }

    componentWillUpdate(nextProps, nextState){
        if (nextProps.end != this.props.end){
            console.log ('destination city change detected.')
            this.setState({
                counter: nextProps.start,
                max: nextProps.end
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.counter < this.state.max){
            this.countUp()
        }
    }


    render() {
        var {counter} = this.state;
        return (        
            <span className="NumberDisplay">
                {this.showCounter()}
            </span>
        )   
    }
}

export default NumberCountUp;

