import React, { Component } from 'react';
import { connect } from 'react-redux'



class InteractionLayer extends Component {
  state = {
    pointertrace: [],
    changes: {},
    pendown: false,
  }

  constructor(props){
      super(props);
      this.canvRef = React.createRef();
      this.getSize = props.getSize;
      this.interpretTraceEl = props.interpretTraceEl
  }

  pointerDownHandler(e) {
    //console.log(e.button);
    if(e.button===5 || e.button===2){
      return}
    //console.log(e, this)
    this.setState({
      pendown: true,
      pointertrace: [{x: e.clientX, y: e.clientY}]
    })

    const ctx = this.canvRef.current.getContext('2d');

    ctx.beginPath();
  }

  pointerUpHandler(e) {
    this.props.pointerUp()
    if(e.button===5 || e.button===2){
      this.setState({
        pendown: false,
        pointertrace: [],
        changes: {}
      })
      var deltrace = null;
      var dist = 25;
      for(var i = 0; i < this.props.displaytraces.length; i++){
        var temp = this.props.traces.find(el => el.t === this.props.displaytraces[i].t)
        if(temp){
          var trace = temp.trace;
        } else {
          continue;
        }
        var t = temp.t;
        for(var j = 0; j < trace.length; j++){
          var newdist = Math.pow(Math.pow((trace[j].x - e.clientX),2) + Math.pow((trace[j].y - e.clientY),2),.5)
          if(newdist < dist){
            
            deltrace = t;
            dist = newdist;
          }
        }
      }
      if(deltrace !== null){
        this.props.delTrace(deltrace)
      }
      return
    }
    this.props.addTrace(this.state.pointertrace, this.state.changes);

    this.setState({
      pendown: false,
      pointertrace: [],
      changes: {}
    })
    const ctx = this.canvRef.current.getContext('2d');
    ctx.clearRect(0, 0, this.getSize().x, this.getSize().y);
  }

  pointerMoveHandler(e) {
    var offsetTop = this.canvRef.current.getBoundingClientRect().top
    var offsetLeft = this.canvRef.current.getBoundingClientRect().left
    if(e.button===5 || e.button===2){
      return}
    if (this.state.pendown) {
      this.setState({
        pointertrace: [...this.state.pointertrace, {x: e.clientX, y: e.clientY}]
      })
      const ctx = this.canvRef.current.getContext('2d');

      var change = this.interpretTraceEl(this.state.pointertrace.slice(-(Math.min(10, this.state.pointertrace.length))));
      
      if(change && Object.keys(change)[0] === "dates"){

        var dates = this.state.changes.dates ? this.state.changes.dates : [];
        var val = [...dates, change.dates]
        this.setState({
          changes: {...this.state.changes, dates: val}
        })
        console.log(this.state.changes)
      }
      else if(change){
        this.setState({
          changes : {...this.state.changes, ...change}
        })
      }


      ctx.moveTo(this.state.pointertrace[this.state.pointertrace.length-1].x - offsetLeft, this.state.pointertrace[this.state.pointertrace.length-1].y -offsetTop);
      ctx.strokeStyle = this.props.uicolor;
      ctx.lineTo(e.clientX - offsetLeft, e.clientY - offsetTop);
      ctx.stroke(); 
    }
  }

  componentDidUpdate(){
    if(!this.state.pendown){
       this.displaytraces();
    }
  }

  displaytraces(){
    const ctx = this.canvRef.current.getContext('2d');
    ctx.clearRect(0, 0, this.getSize().x, this.getSize().y);
    for(var i = 0; i < this.props.displaytraces.length; i++){
      var tmp = this.props.traces.find(el => el.t === this.props.displaytraces[i].t && el.type === "ui")
      if(tmp){
        this.drawtrace(ctx, tmp.trace, this.props.displaytraces[i].alpha);
      }
    }
  }

  drawtrace(ctx, trace, alpha){
    ctx.strokeStyle = "rgba(0, 0, 0, " + alpha + ")";
    var offsetTop = this.canvRef.current.getBoundingClientRect().top
    var offsetLeft = this.canvRef.current.getBoundingClientRect().left
    ctx.beginPath();
    ctx.moveTo(trace[0].x - offsetLeft, trace[0].y - offsetTop);

    for(var i = 1; i < trace.length; i++){
      ctx.lineTo(trace[i].x - offsetLeft,trace[i].y -offsetTop);
    }
    ctx.stroke();
  }

  render() {
    //console.log(this.props);
    return (
        <canvas id="interactionlayer" 
        ref={this.canvRef} 
        height={this.getSize().y} 
        width={this.getSize().x} 
        onContextMenu={(e)=>  {e.preventDefault(); return false;}}
        onPointerDown={this.pointerDownHandler.bind(this)} 
        onPointerUp={this.pointerUpHandler.bind(this)} 
        onPointerMove={this.pointerMoveHandler.bind(this)}
        />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    traces: state.traces,
    penstate: state.penstate,
    displaytraces: state.displaytraces,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTrace: (pointertrace, changes) => { dispatch({type: 'ADD_UITRACE', trace: pointertrace, changes: changes}) },
    delTrace: (t) => { dispatch({type: 'DEL_UITRACE', t: t}) },
    clrDisplaytrace: () => { dispatch({type: 'CLR_DISPLAYTRACE'}) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InteractionLayer);
