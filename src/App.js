import React, { Component } from 'react';
import Topbar from './Topbar'
import Selection from './Selection/Selection'
import Results from './Results/Results'


class App extends Component {

  render() {
    return (
      <div id="appcontainer" className="App">
        <Topbar />
        <Selection />
        <Results />
      </div>
    );
  }
}

export default App;
