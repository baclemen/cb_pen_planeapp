import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import easyjet from './img/easyjet.png';
import british from './img/british airways.png';
import swiss from './img/swiss.png';
import {ReactComponent as Luggage} from './img/noun_Suitcase_10620.svg'
import {ReactComponent as Lowprice} from './img/noun_percentage_108380.svg'

const Elements = ({input, isloading, passengers}) => {

    const resultList = input.length ? (
        input.map(el => {
            return (
                <tr className="resultElement" key={el.id}>
                    <td style={{padding: "0", verticalAlign: "middle"}}>{logo(el.airline)}</td>
                    <td><text className="tableBig">{el.date.slice(8,10) + '.' + el.date.slice(5,7) + '.' +el.date.slice(0,4)}</text></td>
                    <td><b className="tableBig">{el.date.slice(11,16) + " - " + getTime(el.date.slice(11,16), el.duration)}</b> <br/>
                        <text className="tableSmall">{el.airline}</text>
                    </td>
                    <td><text className="tableBig">{Math.floor(el.duration / 60) + " h " + el.duration % 60 + " m"}</text><br/>
                        <text className="tableSmall">ZRH-LGW</text>
                    </td>
                    <td>
                        {el.luggage && <Luggage height="15px"/> } {el.luggage && <br/>}
                        {el.price < 75 && <Lowprice height="15px"/>}
                    </td>
                    <td><text className="tableBig">{(el.stops === 0 ? "Non-stop" : el.stops + " stop") + (el.stops > 1 ? "s" : "")}</text></td>
                    <td style={{textAlign: "right"}}><b className="tableBig">{"CHF " + el.price * passengers}</b></td>
                </tr>
            )
        })
    ) : (
        <p className="center" style={{margin: "10px"}} >Could not find any Flights</p>
    )

    function getTime(start, duration){
        var s = start.split(/[: ]/);
        var minutes = (parseInt(s[0]) * 60 + parseInt(s[1])) + duration;
        var end = Math.floor(minutes / 60) % 24 + ":"+ (minutes % 60 > 10 ? "" : "0") + minutes % 60;
        return end
    }

    function logo(airline){
        var source
        switch (airline) {
            case "SWISS":
                source=swiss;
                break;
            case "British Airways":
                source = british
                break;
            case "easyJet":
                source = easyjet
                break;
            default:
                break;
        }
        return <img src={source} style={{marginLeft: "20px", marginRight: "20px"}} alt="Logo" className="minilogo"/>
    }


    return (
        <table id="resultstable" className="resultstable">
            <thead>
                <tr className="cbdatepicker" style={{visibility: (input.length > 0 ? "" : "hidden")}} id="cbdatepickerheader">
                    <th></th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Duration</th>
                    <th></th>
                    <th></th>
                    <th>Price</th>
                </tr>
            </thead>
            {isloading && <Loader type="Oval" color="#00BFFF" height={80} width={80} />}
            {!isloading &&
            <tbody id="resultstablebody">
                {resultList}
            </tbody>
            }
        </table>
    )
}

export default Elements