import React, { Component } from 'react';
import MOCK_DATA from './MOCK_DATA'
import { connect } from 'react-redux';
import Elements from './Elements'


class Results extends Component{

    filteredData(){
        return MOCK_DATA.filter(x => 
            (x.direct || !this.props.uiState.direct) && 
            (x.luggage || !this.props.uiState.luggage) && 
            (x.lowcost || !this.props.uiState.lowcost) &&
            (this.timeTo01(x.time) > this.props.uiState.depfrom) &&
            (this.timeTo01(x.time) < this.props.uiState.depto)
            )
    }

    timeTo01(time){
        var s = time.split(/[: ]/);
        console.log(s)
        var result = s[2] === "PM" ? (0.8 - 8/15 + parseInt(s[0])/15 + parseInt(s[1])/15/60) : (-8/15 + parseInt(s[0])/15 + parseInt(s[1])/15/60)
        console.log(result)
        return result
    }

    render(){        
        return(
            <div id="Results">
                <Elements input={this.filteredData()}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        uiState: state.uiState
    }
  }

export default connect(mapStateToProps)(Results);