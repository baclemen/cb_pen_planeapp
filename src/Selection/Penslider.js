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
    ctx.fillText(this.props.title, 0, 30);

    var img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
    }
    img.height = 40;
    img.width = 40;

    //sliderline
    ctx.beginPath();
    ctx.strokeStyle = this.props.uicolor

    ctx.moveTo(50, 25);
    ctx.lineTo(320, 25);
    ctx.stroke(); 

    //slider
    ctx.beginPath();
    ctx.lineWidth = 3;
    console.log(this.props.uiState)
    ctx.moveTo( 50 + this.props.uiState[this.props.title]*270, 10);
    ctx.lineTo( 50 + this.props.uiState[this.props.title]*270, 40);
    ctx.stroke();
  }


  render() {
    return (
          <canvas id={this.props.title} ref={this.canvRef} className="slider" height={this.props.height} width={this.props.width*.8 + 3}/>
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
  