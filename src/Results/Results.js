import React, { Component } from 'react';
import MOCK_DATA from './MOCK_DATA'
import { connect } from 'react-redux';
import Elements from './Elements'


class Results extends Component{

    filteredData(){

        var uiState = this.props.initValues
        var dates = this.props.initValues.dates;

        for(var i = 0; i < this.props.traces.length; i++){
            if(this.props.traces[i].type === 'ui'){
                uiState = {
                    ...uiState, 
                    ...this.props.traces[i].changes}
                }
                if(this.props.traces[i].changes.dates){
                    for(var j = 0; j < this.props.traces[i].changes.dates.length; j++){
                        if(this.props.traces[i].changes.dates[j].add){
                            if(!dates.map(x => x.getTime()).includes(this.props.traces[i].changes.dates[j].val.getTime())){
                                dates = [...dates, this.props.traces[i].changes.dates[j].val]
                            }
                        }
                        else{
                            if(dates.map(x => x.getTime()).includes(this.props.traces[i].changes.dates[j].val.getTime())){
                                dates = dates.filter(x => x.getTime === this.props.traces[i].changes.dates[j].val. getTime())
                            }
                        }
                    }
                }
            else {
                
            }
        }

        return MOCK_DATA.filter(x => 
            (x.direct || !uiState.direct) && 
            (x.luggage || !uiState.luggage) && 
            (x.lowcost || !uiState.lowcost) &&
            (x.capacity >= uiState.kids + uiState.adults) &&
            (this.timeTo01(x.time) > uiState.dep[0]) &&
            (this.timeTo01(x.time) < uiState.dep[1])
        )
    }

    timeTo01(time){
        var s = time.split(/[: ]/);
        var result = s[2] === "PM" ? (0.8 - 8/15 + parseInt(s[0])/15 + parseInt(s[1])/15/60) : (-8/15 + parseInt(s[0])/15 + parseInt(s[1])/15/60)
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
        uiState: state.uiState,
        traces: state.traces,
        initValues: state.initValues
    }
  }

export default connect(mapStateToProps)(Results);