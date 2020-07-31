import React from 'react';

const Elements = ({input}) => {

    const resultList = input.length ? (
        input.map(el => {
            return (
                <tr className="resultElement" key={el.id}>
                    <th>{el.date}</th>
                    <th>{el.time}</th>
                    <th>{el.luggage ? "Yes" : "No"}</th>
                    <th>{el.lowcost ? "Yes" : "No"}</th>
                    <th>{el.direct ? "Yes" : "No"}</th>
                </tr>
            )
        })
    ) : (
        <p className="center">Could not find any Flights</p>
    )


    return (
        <table id="pickertable" className="cbdatepicker">
            <thead>
                <tr className="cbdatepicker" id="cbdatepickerheader">
                    <th>Date</th>
                    <th>Time</th>
                    <th>Luggage</th>
                    <th>Lowcost</th>
                    <th>Direct</th>
                </tr>
            </thead>

            <tbody>
                {resultList}
            </tbody>
        </table>
    )
}

export default Elements