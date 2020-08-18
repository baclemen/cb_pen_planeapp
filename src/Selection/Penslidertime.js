import React, { Component } from 'react';



class Penslidertime extends Component {

    constructor(props){
        super(props);
        this.canvRef = React.createRef();
    }

    componentDidMount(){

        const ctx = this.canvRef.current.getContext("2d");

        for(var i = 0; i<7; i++){

            ctx.strokeStyle = "#DADCE0"
            ctx.beginPath()
            ctx.moveTo(50 + i * 40,20);
            ctx.lineTo(50 + i * 40,130);
            ctx.stroke();

            ctx.font = '8pt Tahoma';
            ctx.textAlign = 'center';
            ctx.fillStyle = "#4285F4";
            ctx.fillText((i*4) + ":00", 50 + i * 40,10);
        }
    }



  render() {
    return (
          <canvas id={this.props.title} ref={this.canvRef} className="slidertime" height={this.props.height} width={this.props.width*.8}/>
    );
  }
}
  
  export default Penslidertime;
  