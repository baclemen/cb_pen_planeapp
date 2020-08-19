import React, { Component } from 'react';
import { connect } from 'react-redux'
import {ReactComponent as Luggage} from './img/noun_Suitcase_10620.svg'
import {ReactComponent as Lowprice} from './img/noun_percentage_108380.svg'

class Checkbox extends Component{

    state = {
        isChecked: false
    }
  
    constructor(props){
        super(props);
        this.canvRef = React.createRef();
    }

    componentDidMount(){
        this.renderCanvas()
    }

    componentDidUpdate(){
        this.renderCanvas()
    }
  
    renderCanvas(){
      const ctx = this.canvRef.current.getContext('2d');
      ctx.clearRect(0, 0, this.props.width, this.props.height);
  

      if (this.props.title === 'direct'){
        ctx.lineWidth = 1;
        //title
        ctx.font = "15px Tahoma"
        ctx.fillStyle = this.props.uicolor;
        ctx.fillText(this.props.title, 40, 27)

      } 
      else {

      }
    


      ctx.strokeStyle = "#62676C";

      if(this.props.uiState[this.props.title]){
        ctx.strokeStyle = "#4285F4";
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.moveTo(113,20);
        ctx.lineTo(118,25);
        ctx.lineTo(127,16);
        ctx.stroke();
      }

      ctx.setLineDash([]);
      //box
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.moveTo(112,10);
      ctx.lineTo(128,10);
      ctx.moveTo(130,12);
      ctx.lineTo(130,28);
      ctx.moveTo(128,30);
      ctx.lineTo(112,30);
      ctx.moveTo(110,28);
      ctx.lineTo(110,12);


      ctx.arc(112, 12, 2, Math.PI, 1.5 * Math.PI);
      ctx.arc(128, 12, 2, 1.5 * Math.PI, 2 * Math.PI);
      ctx.arc(128, 28, 2, 0 * Math.PI, .5 * Math.PI)
      ctx.arc(112, 28, 2, .5 * Math.PI, 1 * Math.PI)

      ctx.stroke();
    }


    

    render(){
        return(
            <div>
                {(this.props.title === "luggage") && <Luggage style={{position: "absolute", height: "25px", transform: "translate(40px,12.5px)"}} />}
                {(this.props.title === "lowcost") && <Lowprice style={{position: "absolute", height: "25px", transform: "translate(38px,12px)"}} />}
                <canvas id={this.props.title} className="checkbox" ref={this.canvRef} height={this.props.height} width={this.props.width}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        uiState: state.uiState
    }
}


export default connect(mapStateToProps)(Checkbox)