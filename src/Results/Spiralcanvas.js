import React, { Component } from 'react';
import { connect } from 'react-redux'

class Spiralcanvas extends Component {

    state = {
        height: 0,
        width: 0,
        pointertrace: []
    }

    constructor(props){
        super(props)
        this.canvRef = React.createRef();
    }

    componentDidMount(){
        var height = document.getElementById('Spiralcanvas').clientHeight;
        var width = document.getElementById('Spiralcanvas').clientWidth;
        this.setState({
            height,
            width
          })
    }

    componentDidUpdate(){

        if(!this.state.spiralMode && this.props.history === '3' && this.state.pointertrace.length > 0){
            const spiralRef = this.state.pointertrace[0]
            var spiralCounter = 0;
            for(var i = 3; i < this.state.pointertrace.length - 1; i++){
              if(this.dist(this.state.pointertrace[i], spiralRef) < 20){
                if(this.dist(this.state.pointertrace[i-1], spiralRef) > this.dist(this.state.pointertrace[i], spiralRef) && this.dist(this.state.pointertrace[i], spiralRef) < this.dist(this.state.pointertrace[i+1], spiralRef)){
                  spiralCounter++
                }
              }
            }
            if (spiralCounter > 2){
              const ctx = this.canvRef.current.getContext('2d');
              ctx.clearRect(0,0,this.getSize().x,this.getSize().y);
              this.setState({
                pointertrace: [],
                spiralMode: true,
                deltaT: this.props.deltaT
              })
            }
        }
    }
    
    getSize(){
        return {x: this.state.width, y: this.state.height}
    }

    pointerDownHandler(e) {
        const offsetTop = this.canvRef.current.getBoundingClientRect().top;
        const offsetLeft = this.canvRef.current.getBoundingClientRect().left;
        var p = {x: e.clientX - offsetLeft, y: e.clientY - offsetTop};

        this.setState({
            pendown: true,
            pointertrace: [p],
        })
    }

    pointerUpHandler(e) {
        const ctx = this.canvRef.current.getContext('2d');
        ctx.clearRect(0,0,this.getSize().x,this.getSize().y);
        this.props.updateT()
        this.setState({
            pointertrace: [],
            pendown: false,
            spiralMode: false
        })
    }

    pointerMoveHandler(e) {

        if(this.state.spiralMode && this.props.history === '3' && this.state.pointertrace.length > 3){
            const mid = this.state.pointertrace[0];
            var angle = 0;
            for(var i = 2; i < this.state.pointertrace.length; i++){
              
              var angleDiff = this.angle(this.state.pointertrace[i-1], this.state.pointertrace[i], mid);
              if(!isNaN(angleDiff)){
                angle += angleDiff;
              }
            }
            this.props.setDeltaT(this.state.deltaT-Math.floor(angle/Math.PI * 5));
    
    
    
            var t = this.props.t + this.state.deltaT - Math.floor(angle/Math.PI * 5);
            if(t !== this.state.spiralTempT){
    
              this.setState({spiralTempT : t});
            } 
          }

        const offsetTop = this.canvRef.current.getBoundingClientRect().top;
        const offsetLeft = this.canvRef.current.getBoundingClientRect().left;
        var p = {x: e.clientX - offsetLeft, y: e.clientY - offsetTop};

        if(this.state.pendown && this.state.pointertrace.length > 1){

            const ctx = this.canvRef.current.getContext('2d');

            ctx.beginPath();
            ctx.moveTo(this.state.pointertrace[this.state.pointertrace.length - 1].x, this.state.pointertrace[this.state.pointertrace.length - 1].y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke()
        }

        this.setState({
            pointertrace: [...this.state.pointertrace, p]
        })
    }

    dist(a,b){
        return Math.pow(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2), .5);
    }
  
    diff(a,b){
    return {x: a.x - b.x, y: a.y - b.y};
    }

    angle(p1,p2,mid){
    var vecA = this.diff(p1, mid);
    var vecB = this.diff(p2, mid);
    var valA = this.dist(p1,mid);
    var valB = this.dist(p2,mid);
    var sign = vecA.x * vecB.y - vecA.y * vecB.x > 0 ? -1:1;
    return sign * Math.acos((vecA.x * vecB.x + vecA.y * vecB.y) / (valA * valB))
    }

    render(){
        return(
            <canvas 
            id="Spiralcanvas" 
            ref={this.canvRef} 
            height={this.getSize().y}
            width={this.getSize().x}
            onPointerDown={this.pointerDownHandler.bind(this)} 
            onPointerUp={this.pointerUpHandler.bind(this)} 
            onPointerMove={this.pointerMoveHandler.bind(this)} 
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      traces: state.traces,
      t:state.t,
      uicolor: state.uicolor,
      deltaT: state.deltaT
    }
}

const mapDispatchToProps = dispatch => {
    return {
      setDeltaT: (deltaT) => { dispatch ({ type: 'DELTA_T', deltaT}) },
      setPenstate: (val) => { dispatch({type: 'SET_PENSTATE', update:val}) },
      delTrace: (t) => { dispatch({type: 'DEL_UITRACE', t: t}) },
      updateT: () => { dispatch({type: 'UPDATE_T'})},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Spiralcanvas)