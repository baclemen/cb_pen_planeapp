import React, { Component } from 'react';
import { connect } from 'react-redux'



class Numberselectorvert extends Component {

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
    const ctx = this.canvRef.current.getContext("2d");
    ctx.clearRect(0,0,this.props.width, this.props.height);
    ctx.beginPath();


    ctx.rect(10, 10, 100, 20);
    ctx.strokeStyle = this.props.uicolor

    //-

    //
    ctx.moveTo(94,15);
    ctx.lineTo(90,20);
    ctx.lineTo(94,25);

    //
    ctx.moveTo(100,15);
    ctx.lineTo(104,20);
    ctx.lineTo(100,25);

    ctx.textAlign = "start";
    ctx.font = "14px Tahoma";
    ctx.fillStyle = this.props.uicolor;
    ctx.fillText(this.props.title, 15, 26);

    //ctx.font = "15px Tahoma";
    //ctx.fillStyle = this.props.uicolor;
    //ctx.textAlign = "end";
    //ctx.fillText(this.props.uiState[this.props.title], 65, 26);

    ctx.stroke()

  }

  render() {
    return (
          <canvas title={this.props.title} ref={this.canvRef} className={"numberselectorvert" + this.props.type} type={this.props.type} height={this.props.height} width={this.props.width}/>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
    return {
        uiState: state.uiState,
        uicolor: state.uicolor,
    }
  }
  
  export default connect(mapStateToProps)(Numberselectorvert);
  