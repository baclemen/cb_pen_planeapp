import React, { Component } from 'react';
import { connect } from 'react-redux'



class Penslider extends Component {
  status = {
      sliderpos: 0
  }

  constructor(props){
      super(props);
      this.canvRef = React.createRef();
  }
  componentDidMount(){
    this.setState({
        width: this.props.width,
        heigth: this.props.height,
        sliderpos: 0
    })
  }

  componentDidUpdate(){
      this.renderCanvas()
  }

  renderCanvas(){
    const ctx = this.canvRef.current.getContext('2d');
    ctx.clearRect(0, 0, this.props.width, this.props.height);

    ctx.lineWidth = 1;
    //title
    ctx.font = "15px Tahoma";
    ctx.fillStyle = this.props.uicolor;
    ctx.textAlign = 'left';
    ctx.fillText(this.props.title, 0, 30);

    var img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
    }
    img.height = 40;
    img.width = 40;

    //sliderline
    ctx.beginPath();
    ctx.strokeStyle = "#DADCE0"
    ctx.lineWidth = 2;

    ctx.moveTo(50, 25);
    ctx.lineTo(290, 25);
    ctx.stroke(); 



    if(this.props.uiState[this.props.title + "from"] < this.props.uiState[this.props.title + "to"]){
      ctx.strokeStyle = "#4285F4";
    } else {
      ctx.strokeStyle = "red";
    }
    ctx.beginPath();
    ctx.moveTo(50 + this.props.uiState[this.props.title + "from"]*240, 25);
    ctx.lineTo(50 + this.props.uiState[this.props.title + "to"]*240, 25);
    ctx.stroke();

    //slider
    ctx.beginPath();
    ctx.fillStyle = "#4285F4"
    ctx.arc( 50 + this.props.uiState[this.props.title + "from"]*240, 25, 8, 0, 2 * Math.PI );
    ctx.arc( 50 + this.props.uiState[this.props.title + "to"]*240, 25, 8, 0, 2 * Math.PI );
    ctx.fill(); 


    //box

    var refX = 50 + this.props.uiState[this.props.title + "from"]*240;
    var refY = 30;

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(refX + -18, refY + 10);
    ctx.lineTo(refX - 5, refY + 10)
    ctx.lineTo(refX, refY + 3)
    ctx.lineTo(refX + 5, refY + 10)
    ctx.lineTo(refX + 18, refY + 10);
    ctx.moveTo(refX + 20, refY + 12);
    ctx.lineTo(refX + 20, refY + 28);
    ctx.moveTo(refX + 18, refY + 30);
    ctx.lineTo(refX + -18, refY + 30);
    ctx.moveTo(refX + -20, refY + 28);
    ctx.lineTo(refX + -20, refY + 12);


    ctx.arc(refX + -18, refY + 12, 2, Math.PI, 1.5 * Math.PI);
    ctx.arc(refX + 18, refY + 12, 2, 1.5 * Math.PI, 2 * Math.PI);
    ctx.arc(refX + 18, refY + 28, 2, 0 * Math.PI, .5 * Math.PI)
    ctx.arc(refX + -18, refY + 28, 2, .5 * Math.PI, 1 * Math.PI)
    
    ctx.fill();

    ctx.font = '10pt Tahoma';
    ctx.textAlign = 'center';
    ctx.fillStyle = "white";
    var hh = Math.floor(this.props.uiState[this.props.title + "from"] * 24)
    var mm = Math.floor((this.props.uiState[this.props.title + "from"] * 24 * 60) % 60)
    var time = hh + ":" + (mm < 10 ? "0" : "") + mm;
    ctx.fillText(time, refX, refY + 24);

    //box2
    ctx.fillStyle = "#4285F4"
    var refX = 50 + this.props.uiState[this.props.title + "to"]*240;
    var refY = 30;

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(refX + -18, refY + 10);
    ctx.lineTo(refX - 5, refY + 10)
    ctx.lineTo(refX, refY + 3)
    ctx.lineTo(refX + 5, refY + 10)
    ctx.lineTo(refX + 18, refY + 10);
    ctx.moveTo(refX + 20, refY + 12);
    ctx.lineTo(refX + 20, refY + 28);
    ctx.moveTo(refX + 18, refY + 30);
    ctx.lineTo(refX + -18, refY + 30);
    ctx.moveTo(refX + -20, refY + 28);
    ctx.lineTo(refX + -20, refY + 12);


    ctx.arc(refX + -18, refY + 12, 2, Math.PI, 1.5 * Math.PI);
    ctx.arc(refX + 18, refY + 12, 2, 1.5 * Math.PI, 2 * Math.PI);
    ctx.arc(refX + 18, refY + 28, 2, 0 * Math.PI, .5 * Math.PI)
    ctx.arc(refX + -18, refY + 28, 2, .5 * Math.PI, 1 * Math.PI)
    
    ctx.fill();

    ctx.font = '10pt Tahoma';
    ctx.textAlign = 'center';
    ctx.fillStyle = "white";
    var hh = Math.floor(this.props.uiState[this.props.title + "to"] * 24)
    var mm = Math.floor((this.props.uiState[this.props.title + "to"] * 24 * 60) % 60)
    var time = hh + ":" + (mm < 10 ? "0" : "") + mm;
    ctx.fillText(time, refX, refY + 24);

    // ctx.strokeStyle = this.props.uicolor;
    // ctx.beginPath();
    // ctx.lineWidth = 3;
    // ctx.moveTo( 50 + this.props.uiState[this.props.title][0]*270, 10);
    // ctx.lineTo( 50 + this.props.uiState[this.props.title][0]*270, 40);
    // ctx.stroke();

    // ctx.beginPath();
    // ctx.lineWidth = 3;
    // ctx.moveTo( 50 + this.props.uiState[this.props.title][1]*270, 10);
    // ctx.lineTo( 50 + this.props.uiState[this.props.title][1]*270, 40);
    // ctx.stroke();
  }


  render() {
    return (
          <canvas id={this.props.title} ref={this.canvRef} className="slider" height={this.props.height} width={this.props.width*.8}/>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
    return {
        uiState: state.uiState,
        uicolor: state.uicolor,
    }
  }
  
  export default connect(mapStateToProps)(Penslider);
  