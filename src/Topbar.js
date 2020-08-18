import React, { Component } from 'react';
import {ReactComponent as Logo} from './penflight logo.svg'



class Topbar extends Component{


    render(){
        return(
            <div id="topbar">
                <Logo height="30px" style={{display: "inline-block", left: 0}}/>
                <text id="title">PenFlight</text>
            </div>
        )
    }
}

export default Topbar;