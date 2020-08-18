import React, { Component } from 'react';
import Checkbox from './Checkbox';
import InteractionLayer from './InteractionLayer';
import { connect } from 'react-redux';
import Penslider from './Penslider';
import Penslidertime from './Penslidertime';
import Calendar from './Calendar'
import Numberselector from './Numberselector'
import { ReactComponent as Destfrom } from './img/destfrom.svg'
import { ReactComponent as Destto } from './img/destto.svg'

class Selection extends Component {

  state = {
    height: 0,
    width: 0,
    numberselector: null,
    numberselectorval: null,
    numberselectorvert: null,
    numberselectorvertval: null,
    numberselectorrefval: null,
    year: 2020,
    month: 7,
  }

  constructor(props) {
    super(props);
    this.divRef = React.createRef();
  }

  componentDidMount() {
    var height = document.getElementById('Selection').clientHeight;
    var width = document.getElementById('Selection').clientWidth;
    this.setState({
      height,
      width,
    })
  }

  interpretTraceEl(traceels) {

    const offsetTop = this.divRef.current.getBoundingClientRect().top;
    const offsetLeft = this.divRef.current.getBoundingClientRect().left;


    const calenders = this.divRef.current.querySelector("#innercalenderdiv").childNodes


    for (var i = 0; i < calenders.length; i++) {
      const table = calenders[i].getElementsByTagName('tbody')[0];

      var rect = table.getBoundingClientRect()
      var p1 = { x: rect.left, y: rect.top };
      var p2 = { x: rect.right, y: rect.bottom };

      if (this.inBox(traceels[0], p1, p2)) {
        var refel, a, b
        if (traceels.length === 1) {
          refel = traceels[0]
        }
        else {
          refel = traceels[1]
        }
        for (a = 0; a < 6; a++) {
          var top = table.children.item(a).getBoundingClientRect().top;
          var bottom = table.children.item(a).getBoundingClientRect().bottom;
          if (top < refel.y && refel.y < bottom) {
            break
          }
        }
        for (b = 0; b < 7; b++) {
          var left = table.children.item(0).children.item(b).getBoundingClientRect().left;
          var right = table.children.item(0).children.item(b).getBoundingClientRect().right;
          if (left < refel.x && refel.x < right) {
            break;
          }
        }
        if (a > 5 || b > 6) {
          break
        }
        var el = table.children.item(a).children.item(b)
        var rect = el.getBoundingClientRect()
        var p1 = { x: rect.left, y: rect.top };
        var p2 = { x: rect.right, y: rect.bottom };

        var date;

        if (traceels.length === 1) {

          if (this.inBox(traceels[0], p1, p2) && el.innerHTML !== "") {
            date = new Date((this.props.uiState.date.getMonth() + 1 + i) + " " + el.innerHTML + " " + this.props.uiState.date.getFullYear())
          }
        }
        else {
          if (!this.inBox(traceels[0], p1, p2) && this.inBox(traceels[1], p1, p2) && el.innerHTML !== "") {
            date = new Date((this.props.uiState.date.getMonth() + 1 + i) + " " + el.innerHTML + " " + this.props.uiState.date.getFullYear())
          }
        }

        var record;
        if (date && this.props.uiState.dates.map(x => x.getTime()).includes(date.getTime())) {
          record = {};
          id = "dates";
          record[id] = this.props.uiState.dates.filter(x => x.getTime() !== date.getTime());
          this.props.setState(record);
          record[id] = { add: false, val: date };
          return record;
        }
        else if (date) {
          record = {};
          id = "dates";
          record[id] = [...this.props.uiState.dates, date];
          this.props.setState(record);
          record[id] = { add: true, val: date };
          return record;
        }


      }
    }

    if (traceels.length < 2) {
      return null;
    }

    const numberselectors = this.divRef.current.querySelector("#passengerselectiondiv").childNodes

    if (this.state.numberselector !== null) {
      var numberselector = numberselectors[this.state.numberselector];
      var ref = numberselector.getBoundingClientRect().top + 10;
      var delta = Math.floor((-traceels[1].y + ref) / 20) + 1
      var val = Math.max(this.state.numberselectorval + delta, 0);
      var record = {};
      var id = numberselector.id;
      record[id] = val;
      if (this.props.uiState[id] !== val) {
        this.props.setState(record);
      }
      return record;
    }
    else {
      for (var i = 0; i < numberselectors.length; i++) {
        var numberselector = numberselectors[i];
        var p1 = { x: 50 + numberselector.getBoundingClientRect().left, y: numberselector.getBoundingClientRect().top + 10 };
        var p2 = { x: numberselector.getBoundingClientRect().left + 110, y: numberselector.getBoundingClientRect().top + 30 };

        //console.log(numberselectors)

        if (this.inBox(traceels[1], p1, p2)) {
          this.setState({
            numberselector: i,
            numberselectorval: this.props.uiState[numberselector.id]
          })
          return //record;
        }
      }
    }

    const numberselectorsvert = this.divRef.current.querySelectorAll(".numberselectorvertmonth, .numberselectorvertyear")


    if (this.state.numberselectorvert !== null) {
      var numberselector = numberselectorsvert[this.state.numberselectorvert];
      var ref = numberselector.getBoundingClientRect().right;
      var delta = Math.floor((traceels[1].x - this.state.numberselectorrefval.x) / 20);
      var record = {};
      var type = numberselector.getAttribute("type");
      var val;


      if (type === "month") {
        val = new Date(new Date(this.state.numberselectorvertval).setMonth(this.state.numberselectorvertval.getMonth() + delta));
      }
      else {
        val = new Date(new Date(this.state.numberselectorvertval).setYear(this.state.numberselectorvertval.getFullYear() + delta));
      }
      record.date = val;
      if (this.props.uiState.date.getTime() !== val.getTime()) {
        this.props.setState(record);
      }
      return record;
    }
    else {
      for (var i = 0; i < numberselectorsvert.length; i++) {
        var numberselector = numberselectorsvert[i];
        var p1 = { x: 10 + numberselector.getBoundingClientRect().left, y: numberselector.getBoundingClientRect().top + 10 };
        var p2 = { x: numberselector.getBoundingClientRect().left + 100, y: numberselector.getBoundingClientRect().top + 30 };


        if (this.inBox(traceels[1], p1, p2)) {
          this.setState({
            numberselectorvert: i,
            numberselectorvertval: this.props.uiState.date,
            numberselectorrefval: traceels[1],
          })
          return //record;
        }
      }
    }


    const sliders = this.divRef.current.querySelector("#timesliderdiv").childNodes

    for (var i = 0; i < sliders.length; i++) {
      var slider = sliders[i]
      var p1 = { x: 50 + slider.getBoundingClientRect().left, y: slider.getBoundingClientRect().top + 25 };
      var p2 = { x: slider.getBoundingClientRect().right - 30, y: slider.getBoundingClientRect().top + 25 };




      if (this.intersects(traceels[0], traceels[1], p1, p2)) {
        var val = ((traceels[0].x + traceels[1].x) / 2 - p1.x) / (slider.width - 80);
        var id = slider.id;
        var record = {}

        // if (traceels[0].y > traceels[1].y) {
        //   record[id + "to"] = val;
        //   // if (record[id][0] > record[id][1]) {
        //   //   record[id][0] = record[id][1] - .1
        //   // }
        //   this.props.setState(record);
        //   return record;
        // }
        // else {
        //   record[id + "from"] = val;
        //   // if (record[id][0] > record[id][1]) {
        //   //   record[id][1] = record[id][0] + .1
        //   // }
        //   this.props.setState(record);
        //   return record;
        // }
        var dir = (traceels[0].x - traceels[1].x) + (traceels[2].x - traceels[1].x)
        if(dir < 0){
          record[id + "to"] = val;
          this.props.setState(record);
          return record;
        }
        else {
          record[id + "from"] = val;
          this.props.setState(record);
          return record;
        }

      }
    }

    const checkboxes = this.divRef.current.querySelector("#checkboxdiv").childNodes

    for (var i = 0; i < checkboxes.length; i++) {
      var checkbox = checkboxes[i]
      var p1 = { x: checkbox.getBoundingClientRect().left + 110, y: checkbox.getBoundingClientRect().top + 10 }
      var p2 = { x: checkbox.getBoundingClientRect().left + 130, y: checkbox.getBoundingClientRect().top + 30 }

      if (!this.inBox(traceels[0], p1, p2) && this.inBox(traceels[1], p1, p2)) {
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

  getSize() {
    return { x: this.state.width, y: this.state.height }
  }

  inBox(val, p1, p2) {
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

  pointerUp() {
    this.setState({
      numberselector: null,
      numberselectorval: null,
      numberselectorvert: null,
      numberselectorvertval: null,
    })
  }

  render() {
    return (
      <div id="uidiv">
        <InteractionLayer getSize={this.getSize.bind(this)} interpretTraceEl={this.interpretTraceEl.bind(this)} pointerUp={this.pointerUp.bind(this)} uicolor={this.props.uicolor} />
        <div id="Selection" width={1240} ref={this.divRef}>
          <div id="route">
            <div id="destfrom">
              <Destfrom class="uisvg" height={20} />
              <text>Zürich</text>
            </div>
            <div id="destto">
              <Destto class="uisvg" height={20} />
              <text>London</text>
            </div>
          </div>
          <div id="selectordiv">
            <Penslidertime width={420} height={200} uicolor={this.props.uicolor} />
            <div id="passengerselectiondiv">
              <Numberselector title={"adults"} className="pennumberselector" width={120} height={40} uicolor={this.props.uicolor} />
              <Numberselector title={"kids"} className="pennumberselector" width={120} height={40} uicolor={this.props.uicolor} />
            </div>
            <div id="checkboxdiv">
              <Checkbox title={"direct"} className="pencheckbox" width={200} height={40} uicolor={this.props.uicolor} />
              <Checkbox title={"luggage"} className="pencheckbox" width={200} height={40} uicolor={this.props.uicolor} />
              <Checkbox title={"lowcost"} className="pencheckbox" width={200} height={40} uicolor={this.props.uicolor} />
            </div>
            <div id="timesliderdiv">
              <Penslider title={"dep"} className="penslider" width={400} height={70} uicolor={this.props.uicolor} />
              <Penslider title={"arr"} className="penslider" width={400} height={70} uicolor={this.props.uicolor} />
            </div>
          </div>
          <div id="calenderdiv">
            <div id="innercalenderdiv">
              <Calendar year={this.props.uiState.date.getFullYear()} month={this.props.uiState.date.getMonth()} />
              <Calendar year={this.props.uiState.date.getFullYear()} month={this.props.uiState.date.getMonth() + 1} />
            </div>
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
    setCheckbox: (type) => { dispatch({ type: "CHECK", id: type }) },
    setState: (val) => { dispatch({ type: 'SET_STATE', update: val }) },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Selection);