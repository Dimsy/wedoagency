import React, {Component} from 'react'
import './veil.css';
import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'
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
                {loadProgressBar()}
            </div>
        )
    }
}

export default VeilWorkaround