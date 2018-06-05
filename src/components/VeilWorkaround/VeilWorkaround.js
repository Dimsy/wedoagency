import React, {Component} from 'react'
import './veil.css';
import {Link} from 'react-router-dom'

class VeilWorkaround extends Component{

    state = {
        show: false
    }

    render(){
        return (
            <div className="veil veilOut" id="veil">
            </div>
        )
    }
}

export default VeilWorkaround