import React, { Component } from 'react';


class Calendar extends Component {

    render(){
        return(

            <table id="pickertable" className="cbdatepicker">
                <thead>
                    <tr className="cbdatepicker" id="cbdatepickerheader">
                        <th className="cbdatepicker">Mon</th>
                        <th className="cbdatepicker">Tue</th>
                        <th className="cbdatepicker">Wed</th>
                        <th className="cbdatepicker">Thu</th>
                        <th className="cbdatepicker">Fri</th>
                        <th className="cbdatepicker">Sat</th>
                        <th className="cbdatepicker">Sun</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="cbdatepicker">
                        <td className="cbdatepicker" id="d00" >1</td>
                        <td className="cbdatepicker" id="d01">2</td>
                        <td className="cbdatepicker" id="d02">3</td>
                        <td className="cbdatepicker" id="d03">4</td>
                        <td className="cbdatepicker" id="d04">5</td>
                        <td className="cbdatepicker" id="d05">6</td>
                        <td className="cbdatepicker" id="d06">7</td>
                    </tr>
                    <tr className="cbdatepicker">
                        <td className="cbdatepicker" id="d10">8</td>
                        <td className="cbdatepicker" id="d11">9</td>
                        <td className="cbdatepicker" id="d12">10</td>
                        <td className="cbdatepicker" id="d13">11</td>
                        <td className="cbdatepicker" id="d14">12</td>
                        <td className="cbdatepicker" id="d15">13</td>
                        <td className="cbdatepicker" id="d16">14</td>
                    </tr>
                    <tr className="cbdatepicker">
                        <td className="cbdatepicker" id="d20">15</td>
                        <td className="cbdatepicker" id="d21">16</td>
                        <td className="cbdatepicker" id="d22">17</td>
                        <td className="cbdatepicker" id="d23">18</td>
                        <td className="cbdatepicker" id="d24">19</td>
                        <td className="cbdatepicker" id="d25">20</td>
                        <td className="cbdatepicker" id="d26">21</td>
                    </tr>
                    <tr className="cbdatepicker">
                        <td className="cbdatepicker" id="d30">22</td>
                        <td className="cbdatepicker" id="d31">23</td>
                        <td className="cbdatepicker" id="d32">24</td>
                        <td className="cbdatepicker" id="d33">25</td>
                        <td className="cbdatepicker" id="d34">26</td>
                        <td className="cbdatepicker" id="d35">27</td>
                        <td className="cbdatepicker" id="d36">28</td>
                    </tr>
                    <tr className="cbdatepicker">
                        <td className="cbdatepicker" id="d40">29</td>
                        <td className="cbdatepicker" id="d41">30</td>
                        <td className="cbdatepicker" id="d42">31</td>
                        <td className="cbdatepicker" id="d43">32</td>
                        <td className="cbdatepicker" id="d44">33</td>
                        <td className="cbdatepicker" id="d45">34</td>
                        <td className="cbdatepicker" id="d46">35</td>
                    </tr>
                    <tr className="cbdatepicker">
                        <td className="cbdatepicker" id="d50"></td>
                        <td className="cbdatepicker" id="d51"></td>
                        <td className="cbdatepicker" id="d52"></td>
                        <td className="cbdatepicker" id="d53"></td>
                        <td className="cbdatepicker" id="d54"></td>
                        <td className="cbdatepicker" id="d55"></td>
                        <td className="cbdatepicker" id="d56"></td>
                    </tr>
                </tbody>
            </table>

        );
    }
}

export default Calendar