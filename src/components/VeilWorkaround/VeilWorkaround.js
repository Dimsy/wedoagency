import React, {Component} from 'react'
import './veil.css';
import {Link} from 'react-router-dom'
import Loader from '../Loader';

class VeilWorkaround extends Component{

    state = {
        show: false
    }

    render(){
        return (
            <div className="veil" id="veil">
                <div className="veilLogo"/>
            </div>
        )
    }
}

export default VeilWorkaround