import React, { Component } from 'react';
import { connect } from 'react-redux'



class Numberselector extends Component {

  constructor(props){
      super(props);
      this.canvRef = React.createRef();
  }

  componentDidMount(){
    this.drawComponent()
  }

  componentDidUpdate(){
    this.drawComponent()
  }

  drawComponent(){
    const ctx = this.canvRef.current.getContext("2d")
    ctx.clearRect(0,0,this.props.width, this.props.height)
    ctx.beginPath();
    ctx.rect(60, 10, 50, 20);
    ctx.strokeStyle = this.props.uicolor

    //|
    ctx.moveTo(90,10);
    ctx.lineTo(90,30);

    //
    ctx.moveTo(95,17);
    ctx.lineTo(100,13);
    ctx.lineTo(105,17);

    //
    ctx.moveTo(95,23);
    ctx.lineTo(100,27);
    ctx.lineTo(105,23);

    ctx.textAlign = "start";
    ctx.font = "15px Tahoma";
    ctx.fillStyle = this.props.uicolor;
    ctx.fillText(this.props.title + ": ", 10, 26);

    ctx.font = "15px Tahoma";
    ctx.fillStyle = this.props.uicolor;
    ctx.textAlign = "end";
    ctx.fillText(this.props.uiState[this.props.title], 85, 26);

    ctx.stroke()

  }

  render() {
    return (
          <canvas id={this.props.title} ref={this.canvRef} className="numberselector" height={this.props.height} width={this.props.width}/>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
    return {
        uiState: state.uiState,
        uicolor: state.uicolor,
    }
  }
  
  export default connect(mapStateToProps)(Numberselector);
  