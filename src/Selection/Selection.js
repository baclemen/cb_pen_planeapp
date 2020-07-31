import React, { Component } from 'react';
import Checkbox from './Checkbox';
import InteractionLayer from './InteractionLayer';
import { connect } from 'react-redux';
import Penslider from './Penslider';
import Calendar from './Calendar'

class Selection extends Component{

    state = {
        height: 0,
        width: 0,
      }

    constructor(props){
      super(props);
      this.divRef = React.createRef();
    }

    componentDidMount(){
        var height = document.getElementById('Selection').clientHeight;
        var width = document.getElementById('Selection').clientWidth;
        this.setState({
          height,
          width,
        })
    }

    interpretTraceEl(traceels){

        if(traceels.length <2){
            return null
        }

        const sliders = this.divRef.current.querySelector("#timesliderdiv").childNodes

        for(var i = 0; i<sliders.length; i++){
            var slider = sliders[i]
            var p1 = {x: 50 + slider.getBoundingClientRect().left, y: slider.getBoundingClientRect().top - 25};
            var p2 = {x: slider.getBoundingClientRect().right, y: slider.getBoundingClientRect().top - 25};

            console.log(slider.getBoundingClientRect())



            if(this.intersects(traceels[0], traceels[1], p1, p2)){
                var val = ((traceels[0].x + traceels[1].x) / 2 - 50 - slider.offsetLeft) / (slider.width - 50);
                var id = slider.id;
                var record = {}

                record[id] = val;
                this.props.setState(record);
                return record;
            }
        }

        const checkboxes = this.divRef.current.querySelector("#checkboxdiv").childNodes

        for(var i = 0; i < checkboxes.length; i++){
          var checkbox = checkboxes[i]
          var p1 = {x: checkbox.getBoundingClientRect().left + 110, y: checkbox.getBoundingClientRect().top - 30}
          var p2 = {x: checkbox.getBoundingClientRect().left + 130, y: checkbox.getBoundingClientRect().top - 10}
  
          if(!this.inBox(traceels[0], p1, p2) && this.inBox(traceels[1], p1, p2)){
            this.props.setCheckbox(checkbox.id)
            var val = !this.props.uiState[checkbox.id];
            var id = checkbox.id;
            var record = {
              [id]: val
            };
            return record;
          }
        }
    }

    getSize(){
        return {x: this.state.width, y: this.state.height}
    }

    inBox(val, p1, p2){
        return val.x > p1.x && val.y > p1.y && val.x < p2.x && val.y < p2.y;
    }

    
    intersects(p1, p2, p3, p4) {
        var a = p1.x;
        var b = p1.y;
        var c = p2.x;
        var d = p2.y;
        var p = p3.x;
        var q = p3.y;
        var r = p4.x;
        var s = p4.y;
    
        var det, gamma, lambda;
        det = (c - a) * (s - q) - (r - p) * (d - b);
        if (det === 0) {
          return false;
        } else {
          lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
          gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
          return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
        }
      };

    render(){
        return(
            <div id="Selection" ref={this.divRef}>
                <InteractionLayer getSize={this.getSize.bind(this)} interpretTraceEl={this.interpretTraceEl.bind(this)} uicolor={this.props.uicolor} />
                <div id="passengerselectiondiv"></div>
                <div id="checkboxdiv">
                    <Checkbox title={"direct"} className="pencheckbox" width={200} height={40} uicolor={this.props.uicolor}/>
                    <Checkbox title={"luggage"} className="pencheckbox" width={200} height={40} uicolor={this.props.uicolor}/>
                    <Checkbox title={"lowcost"} className="pencheckbox" width={200} height={40} uicolor={this.props.uicolor}/>
                </div>
                <div id="timesliderdiv">
                    <Penslider title={"depfrom"} className="penslider" width={400} height={50} uicolor={this.props.uicolor}/>
                    <Penslider title={"depto"} className="penslider" width={400} height={50} uicolor={this.props.uicolor}/>
                </div>
                <div id="calenderdiv">
                    <Calendar />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      uiState: state.uiState,
      uicolor: state.uicolor
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      setCheckbox: (type) => { dispatch({type: "CHECK", id: type}) },
      setState: (val) => { dispatch({type: 'SET_STATE', update:val}) },
    }
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(Selection);