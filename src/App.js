import React, { Component } from 'react';
import Topbar from './Topbar'
import Selection from './Selection/Selection'
import Results from './Results/Results'
import Historyselector from './History/Historyselector'
import Button from './History/Button'
import Historybar from './History/Historybar'
import Spiralcanvas from './Results/Spiralcanvas'
import { connect } from 'react-redux';


class App extends Component {

  state = {
    History: 0
  }

  setHistory(val){
    this.setState({
      History: val,
      Historyoverlay: false
    })
  }

  componentDidMount(){
    document.addEventListener('keydown', this.keyDownHandler.bind(this))
  }

  keyDownHandler(event){
    if (event.ctrlKey && event.key === 'z') {
      this.props.undo()
    }
    else if (event.ctrlKey && event.key === 'y') {
      this.props.redo()
    }
  }

  render() {
    return (
      <div id="appcontainer" className="App">
      <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
        <Topbar />
        <Historyselector setHistory={this.setHistory.bind(this)}/>
        {this.state.History === '2' &&
          <div id="button">
            <Button />
          </div>}
        <Selection />
        {this.state.History === '1' &&
          <div id="historybar">
            <Historybar/>
          </div>
        }
        <div id="resultsDiv">
          <Spiralcanvas history={this.state.History}/>
          <Results />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    undo: () => { dispatch({type: 'UNDO' }) },
    redo: () => { dispatch({type: 'REDO' }) },
  }
}

export default connect(null, mapDispatchToProps)(App);
