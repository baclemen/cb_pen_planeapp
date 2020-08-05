import React, { Component } from 'react';
import Checkbox from './Checkbox';
import InteractionLayer from './InteractionLayer';
import { connect } from 'react-redux';
import Penslider from './Penslider';
import Calendar from './Calendar'
import Numberselector from './Numberselector'

class Selection extends Component{

    state = {
        height: 0,
        width: 0,
        numberselector: null,
        numberselectorval: null,
        numberselectorvert: null,
        numberselectorvertval:null,
        year: 2020,
        month: 7,
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

      const offsetTop = this.divRef.current.getBoundingClientRect().top;
      const offsetLeft = this.divRef.current.getBoundingClientRect().left;


        const calenders = this.divRef.current.querySelector("#calenderdiv").childNodes

        for(var i = 0; i < calenders.length; i++){
          const table = calenders[i].getElementsByTagName('tbody')[0];

          var rect = table.getBoundingClientRect()
          var p1 = {x: rect.left - offsetLeft, y: rect.top - offsetTop};
          var p2 = {x: rect.right - offsetLeft, y: rect.bottom - offsetTop};

          if(this.inBox(traceels[0], p1, p2)){
            var refel, a, b
            if(traceels.length === 1){
              refel = traceels[0]
            }
            else {
              refel = traceels[1]
            }
            for(a = 0; a < 6; a++){
              var top = table.children.item(a).getBoundingClientRect().top - offsetTop;
              var bottom = table.children.item(a).getBoundingClientRect().bottom - offsetTop;
              if(top < refel.y && refel.y < bottom){
                break
              }
            }
            for(b = 0; b < 7; b++){
              var left = table.children.item(0).children.item(b).getBoundingClientRect().left - offsetLeft;
              var right = table.children.item(0).children.item(b).getBoundingClientRect().right - offsetLeft;
              if(left < refel.x && refel.x < right){
                break;
              }
            }
            if(a > 5 || b > 6){
              break
            }
            var el = table.children.item(a).children.item(b)
            var rect = el.getBoundingClientRect()
            var p1 = {x: rect.left - offsetLeft, y: rect.top - offsetTop};
            var p2 = {x: rect.right - offsetLeft, y: rect.bottom - offsetTop};

            var date;

            if(traceels.length === 1){

              if(this.inBox(traceels[0], p1, p2) && el.innerHTML !== ""){
                date = new Date((this.props.uiState.date.getMonth() + 1 + i) + " " + el.innerHTML + " " + this.props.uiState.date.getFullYear())
              }
            } 
            else {
              if(!this.inBox(traceels[0], p1, p2) && this.inBox(traceels[1], p1, p2) && el.innerHTML !== ""){
                date = new Date((this.props.uiState.date.getMonth() + 1 + i) + " " + el.innerHTML + " " + this.props.uiState.date.getFullYear())
              }
            }

            var record;
            if(date && this.props.uiState.dates.map(x => x.getTime()).includes(date.getTime())){
              record = {};
              id = "dates";
              record[id] = this.props.uiState.dates.filter(x => x.getTime() !== date.getTime());
              this.props.setState(record);
              record[id] = {add: false, val:date};
              return record;
            }
            else if (date){
              record = {};
              id = "dates";
              record[id] = [...this.props.uiState.dates, date];
              this.props.setState(record);
              record[id] = {add:true, val:date};
              return record;
            }
              
          
          }
        }

        if(traceels.length < 2){
          return null;
        }

        const numberselectors = this.divRef.current.querySelector("#passengerselectiondiv").childNodes

        if(this.state.numberselector !== null){
          var numberselector = numberselectors[this.state.numberselector];
          var ref = numberselector.getBoundingClientRect().top + 10 - offsetTop;
          var delta = Math.floor((-traceels[1].y + ref) / 20) + 1
          var val = Math.max(this.state.numberselectorval + delta, 0);
          var record = {};
          var id = numberselector.id;
          record[id] = val;
          if(this.props.uiState[id] !== val){
            this.props.setState(record);
          }
          return record;
        }
        else{
          for(var i = 0; i<numberselectors.length; i++){
            var numberselector = numberselectors[i];
            var p1 = {x: 70 + numberselector.getBoundingClientRect().left - offsetLeft, y: numberselector.getBoundingClientRect().top + 10 - offsetTop};
            var p2 = {x: numberselector.getBoundingClientRect().left + 90 - offsetLeft, y: numberselector.getBoundingClientRect().top + 30 - offsetTop};

            //console.log(numberselectors)

            if(this.inBox(traceels[1], p1, p2)){
              console.log(i);
              this.setState({
                numberselector: i,
                numberselectorval: this.props.uiState[numberselector.id]
              })
              return //record;
            }
          }
        }

        const numberselectorsvert = this.divRef.current.querySelectorAll(".numberselectorvert")

        if(this.state.numberselectorvert !== null){
          var numberselector = numberselectorsvert[this.state.numberselectorvert];
          var ref = numberselector.getBoundingClientRect().right - offsetTop;
          var delta = Math.floor((traceels[1].x - ref) / 20) - 1;
          var record = {};
          var type = numberselector.getAttribute("type");
          var val;


          if(type === "month"){
            val = new Date(new Date(this.state.numberselectorvertval).setMonth(this.state.numberselectorvertval.getMonth()+delta));
          }
          else{
            val = new Date(new Date(this.state.numberselectorvertval).setYear(this.state.numberselectorvertval.getFullYear()+delta));
          }
          console.log(val)
          record.date = val;
          if(this.props.uiState.date.getTime() !== val.getTime()){
             this.props.setState(record);
          }
          return record;
        }
        else{
          for(var i = 0; i<numberselectorsvert.length; i++){
            var numberselector = numberselectorsvert[i];
            var p1 = {x: 70 + numberselector.getBoundingClientRect().left - offsetLeft, y: numberselector.getBoundingClientRect().top + 10 - offsetTop};
            var p2 = {x: numberselector.getBoundingClientRect().left + 90 - offsetLeft, y: numberselector.getBoundingClientRect().top + 30 - offsetTop};

            //console.log(numberselectors)

            if(this.inBox(traceels[1], p1, p2)){
              console.log(i);
              this.setState({
                numberselectorvert: i,
                numberselectorvertval: this.props.uiState.date
              })
              return //record;
            }
          }
        }


        const sliders = this.divRef.current.querySelector("#timesliderdiv").childNodes

        for(var i = 0; i<sliders.length; i++){
            var slider = sliders[i]
            var p1 = {x: 50 + slider.getBoundingClientRect().left, y: slider.getBoundingClientRect().top - 25};
            var p2 = {x: slider.getBoundingClientRect().right, y: slider.getBoundingClientRect().top - 25};




            if(this.intersects(traceels[0], traceels[1], p1, p2)){
                var val = ((traceels[0].x + traceels[1].x) / 2 - 50 - slider.offsetLeft) / (slider.width - 50);
                var id = slider.id;
                var record = {}

                if(traceels[0].y > traceels[1].y){
                  record[id] = [this.props.uiState[id][0],val];
                  if(record[id][0] > record[id][1]){
                    record[id][0] = record[id][1] - .1
                  }
                  this.props.setState(record);
                  return record;
                } 
                else {
                  record[id] = [val, this.props.uiState[id][1]];
                  if(record[id][0] > record[id][1]){
                    record[id][1] = record[id][0] + .1
                  }
                  this.props.setState(record);
                  return record;
                }

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
      }

      pointerUp(){
        this.setState({
          numberselector: null,
          numberselectorval: null,
          numberselectorvert: null,
          numberselectorvertval: null,
        })
      }

    render(){
        return(
          <div id="uidiv">
            <InteractionLayer getSize={this.getSize.bind(this)} interpretTraceEl={this.interpretTraceEl.bind(this)} pointerUp={this.pointerUp.bind(this)} uicolor={this.props.uicolor} />
              <div id="Selection" ref={this.divRef}>
                  <div id="passengerselectiondiv">
                      <Numberselector title={"adults"} className="pennumberselector" width={100} height={40} uicolor={this.props.uicolor} />
                      <Numberselector title={"kids"} className="pennumberselector" width={100} height={40} uicolor={this.props.uicolor} />
                  </div>
                  <div id="checkboxdiv">
                      <Checkbox title={"direct"} className="pencheckbox" width={200} height={40} uicolor={this.props.uicolor}/>
                      <Checkbox title={"luggage"} className="pencheckbox" width={200} height={40} uicolor={this.props.uicolor}/>
                      <Checkbox title={"lowcost"} className="pencheckbox" width={200} height={40} uicolor={this.props.uicolor}/>
                  </div>
                  <div id="timesliderdiv">
                      <Penslider title={"dep"} className="penslider" width={400} height={50} uicolor={this.props.uicolor}/>
                      <Penslider title={"arr"} className="penslider" width={400} height={50} uicolor={this.props.uicolor}/>
                  </div>
                  <div id="calenderdiv">
                      <Calendar year={this.props.uiState.date.getFullYear()} month={this.props.uiState.date.getMonth()}/>
                      {/* <Calendar year={this.state.year} month={this.state.month + 1}/> */}
                  </div>
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