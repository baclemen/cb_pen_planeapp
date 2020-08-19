import React, { Component } from 'react';
import { connect } from 'react-redux'
import Numberselectorvert from './Numberselectorvert'


const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthNamesshort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


class Calendar extends Component {
    state = {
        view: this.initarray(),
        style: this.initarray(),
    }

    initarray(){
        var arr = new Array(6)
        for(var i = 0; i < 6; i++){
            arr[i] = new Array(7)
        }
        return arr
    }

    componentDidMount(){
        this.writemonth(new Date((this.props.month+1) + ' 1 ' + this.props.year))
    }

    componentDidUpdate(nextProps) {
        if (nextProps !== this.props) {
            this.writemonth(new Date((this.props.month+1) + ' 1 ' + this.props.year))
        }
    }

    writemonth(date){
    
        // document.getElementById("yea").innerHTML = date.getFullYear();
        // document.getElementById("mon").innerHTML = monthNames[date.getMonth()];
        //document.getElementById("cbdatepickerheader").style.display = "table-row";
        //$("[id=cbdatepickerheader]").show();
    
    
        const datemp = new Date((date.getMonth()+1) + ' 1 ' + date.getFullYear())
        //console.log(datemp)
        var x = this.findpos(datemp);
        var rowtemp = x.row;
        var linetemp = x.line;
    
        var d = 1;

        var view = this.initarray();
        var style = this.initarray();
    
        for(var i = linetemp; i<6; i++){
            var b = false;
            for(var j = rowtemp; j<7; j++){
                view[i][j] = d;
                var date = new Date((date.getMonth()+1) + ' '+ d +' ' + date.getFullYear());
                if(this.props.uiState.dates.map(x => x.getTime()).includes(date.getTime())){
                    style[i][j] = {
                        backgroundColor: "#4285F4",
                        color: "white"
                    }
                }
                else{
                    style[i][j] = {}
                }
                d++;
                if (d>this.daysInMonth(date)){
                    b = true;
                    break
                }
            }
            rowtemp = 0;
            if (b == true){
                break
            }
        }
        this.setState({
            view, style
        })
        
    }

    daysInMonth (date) { 
        var x = new Date(date.getFullYear(), date.getMonth(), 0).getDate(); 
        return x;
    } 

    findpos(date){
        var x1 = date.getDay();
        //console.log(x1);
        x1 = (x1 + 6) % 7;
        //console.log(x1);
        var date0 = date.getDate() - x1;
        var y1 = Math.floor((date0+5)/7);
        return{
            row: x1,
            line: y1,
        }
    }

    render(){
        return(

            <div className="pickerdiv">

                <Numberselectorvert title={monthNames[this.props.month]} type="month" width={120} height={40} uicolor={this.props.uicolor} />
                <Numberselectorvert title={this.props.year} type="year" width={120} height={40} uicolor={this.props.uicolor} />
                <div className="cbdatepickerdiv">
                    <table className="cbdatepicker">
                        <thead>
                            <tr className="cbdatepickerheader">
                                <th className="cbdatepicker">M</th>
                                <th className="cbdatepicker">T</th>
                                <th className="cbdatepicker">W</th>
                                <th className="cbdatepicker">T</th>
                                <th className="cbdatepicker">F</th>
                                <th className="cbdatepicker">S</th>
                                <th className="cbdatepicker">S</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="cbdatepicker">
                                <td className="cbdatepicker" style={this.state.style[0][0]}>{this.state.view[0][0]}</td>
                                <td className="cbdatepicker" style={this.state.style[0][1]}>{this.state.view[0][1]}</td>
                                <td className="cbdatepicker" style={this.state.style[0][2]}>{this.state.view[0][2]}</td>
                                <td className="cbdatepicker" style={this.state.style[0][3]}>{this.state.view[0][3]}</td>
                                <td className="cbdatepicker" style={this.state.style[0][4]}>{this.state.view[0][4]}</td>
                                <td className="cbdatepicker" style={this.state.style[0][5]}>{this.state.view[0][5]}</td>
                                <td className="cbdatepicker" style={this.state.style[0][6]}>{this.state.view[0][6]}</td>
                            </tr>
                            <tr className="cbdatepicker">
                                <td className="cbdatepicker" style={this.state.style[1][0]}>{this.state.view[1][0]}</td>
                                <td className="cbdatepicker" style={this.state.style[1][1]}>{this.state.view[1][1]}</td>
                                <td className="cbdatepicker" style={this.state.style[1][2]}>{this.state.view[1][2]}</td>
                                <td className="cbdatepicker" style={this.state.style[1][3]}>{this.state.view[1][3]}</td>
                                <td className="cbdatepicker" style={this.state.style[1][4]}>{this.state.view[1][4]}</td>
                                <td className="cbdatepicker" style={this.state.style[1][5]}>{this.state.view[1][5]}</td>
                                <td className="cbdatepicker" style={this.state.style[1][6]}>{this.state.view[1][6]}</td>
                            </tr>
                            <tr className="cbdatepicker">
                                <td className="cbdatepicker" style={this.state.style[2][0]}>{this.state.view[2][0]}</td>
                                <td className="cbdatepicker" style={this.state.style[2][1]}>{this.state.view[2][1]}</td>
                                <td className="cbdatepicker" style={this.state.style[2][2]}>{this.state.view[2][2]}</td>
                                <td className="cbdatepicker" style={this.state.style[2][3]}>{this.state.view[2][3]}</td>
                                <td className="cbdatepicker" style={this.state.style[2][4]}>{this.state.view[2][4]}</td>
                                <td className="cbdatepicker" style={this.state.style[2][5]}>{this.state.view[2][5]}</td>
                                <td className="cbdatepicker" style={this.state.style[2][6]}>{this.state.view[2][6]}</td>
                            </tr>
                            <tr className="cbdatepicker">
                                <td className="cbdatepicker" style={this.state.style[3][0]}>{this.state.view[3][0]}</td>
                                <td className="cbdatepicker" style={this.state.style[3][1]}>{this.state.view[3][1]}</td>
                                <td className="cbdatepicker" style={this.state.style[3][2]}>{this.state.view[3][2]}</td>
                                <td className="cbdatepicker" style={this.state.style[3][3]}>{this.state.view[3][3]}</td>
                                <td className="cbdatepicker" style={this.state.style[3][4]}>{this.state.view[3][4]}</td>
                                <td className="cbdatepicker" style={this.state.style[3][5]}>{this.state.view[3][5]}</td>
                                <td className="cbdatepicker" style={this.state.style[3][6]}>{this.state.view[3][6]}</td>
                            </tr>
                            <tr className="cbdatepicker">
                                <td className="cbdatepicker" style={this.state.style[4][0]}>{this.state.view[4][0]}</td>
                                <td className="cbdatepicker" style={this.state.style[4][1]}>{this.state.view[4][1]}</td>
                                <td className="cbdatepicker" style={this.state.style[4][2]}>{this.state.view[4][2]}</td>
                                <td className="cbdatepicker" style={this.state.style[4][3]}>{this.state.view[4][3]}</td>
                                <td className="cbdatepicker" style={this.state.style[4][4]}>{this.state.view[4][4]}</td>
                                <td className="cbdatepicker" style={this.state.style[4][5]}>{this.state.view[4][5]}</td>
                                <td className="cbdatepicker" style={this.state.style[4][6]}>{this.state.view[4][6]}</td>
                            </tr>
                            <tr className="cbdatepicker">
                                <td className="cbdatepicker" style={this.state.style[5][0]}>{this.state.view[5][0]}</td>
                                <td className="cbdatepicker" style={this.state.style[5][1]}>{this.state.view[5][1]}</td>
                                <td className="cbdatepicker" style={this.state.style[5][2]}>{this.state.view[5][2]}</td>
                                <td className="cbdatepicker" style={this.state.style[5][3]}>{this.state.view[5][3]}</td>
                                <td className="cbdatepicker" style={this.state.style[5][4]}>{this.state.view[5][4]}</td>
                                <td className="cbdatepicker" style={this.state.style[5][5]}>{this.state.view[5][5]}</td>
                                <td className="cbdatepicker" style={this.state.style[5][5]}>{this.state.view[5][6]}</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        uiState: state.uiState
    }
}

export default connect(mapStateToProps)(Calendar)