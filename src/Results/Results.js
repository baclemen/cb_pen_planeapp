import React, { Component } from 'react';
import MOCK_DATA from './mockdata'
import { connect } from 'react-redux';
import Elements from './Elements'
//import worker from './workerfile'



class Results extends Component{

    state = {
        data: this.filteredData(),
        isloading: false,
        kids: 0,
        adults: 0
    }

    async componentDidMount() {
        //this.worker = new WebWorker(worker)
        var data = await this.filteredData()
        this.setState({
            data, 
            isloading: false
        })
    }

    async componentDidUpdate(nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                data: [],
                isloading: true
            })
            var data = await this.filteredData()

            this.setState({
                data, 
                isloading: false
            })
        }
    }

    async filteredData(){
        var uiState = this.props.initValues
        var dates = this.props.initValues.dates;

        for(var i = 0; i < this.props.traces.length; i++){
            if(this.props.t < this.props.traces[i].t){
                break;
            }
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
                                dates = dates.filter(x => x.getTime() !== this.props.traces[i].changes.dates[j].val.getTime())
                            }
                        }
                    }
                }
            else {
                
            }
        }

        console.log(dates)

        var filtered = MOCK_DATA.filter(x =>
            (!x.stops || !uiState.direct) && 
            (x.luggage || !uiState.luggage) && 
            (x.price < 75 || !uiState.lowcost) &&
            (x.capacity >= uiState.kids + uiState.adults) &&
            (this.timeTo01(x.date) > uiState.depfrom) &&
            (this.timeTo01(x.date) < uiState.depto) &&
            (this.time2To01(x.date, x.duration) > uiState.arrfrom) &&
            (this.time2To01(x.date, x.duration) < uiState.arrto) &&
            (this.withinDays(x.date, dates))
        )

        this.setState({
            kids: uiState.kids,
            adults: uiState.adults
        })


        return this.sort(filtered, uiState.sortBy) 
    }

    sort(data, sortBy){

        switch(sortBy.val){
            case("date"):
            if(sortBy.ascending){
                data.sort((a,b) => (new Date(a.date)).getTime() - (new Date(b.date)).getTime())
            }
            else{
                data.sort((a,b) => -(new Date(a.date)).getTime() + (new Date(b.date)).getTime())
            }
            default:
                if(sortBy.ascending){
                    data.sort((a,b) => a[sortBy.val] - b[sortBy.val])
                }
                else{
                    data.sort((a,b) => - a[sortBy.val] + b[sortBy.val])
                }
        }
        return data
    }

    timeTo01(time){

        var time2 = time.slice(11,16)
        var s = time2.split(/[: ]/);
        var result = (parseInt(s[0])/25 + parseInt(s[1])/25/60)
        return result
    }

    time2To01(time, duration){
        var time01 = this.timeTo01(time);
        var arr = (time01 + duration / 60 / 24) % 1;
        return arr
    }

    withinDays(day, days){
        if(days.length === 0){
            return false
        }
        var date = new Date(day)
        return days.map(x => x.getTime()).filter(x => date.getTime() > x && x + 86400000 > date.getTime()) > 0;
    }

    render(){
        return(
            <div id="Results">
                <Elements isloading={this.state.isloading} input={this.state.data} passengers={this.state.kids + this.state.adults}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        traces: state.traces,
        initValues: state.initValues,
        t: state.t,
    }
  }

export default connect(mapStateToProps)(Results);