import React, {Component} from 'react';
import {connect} from 'react-redux';
import Menu from './Menu';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import VeilWorkaround from "../VeilWorkaround/VeilWorkaround";

class Header extends Component {

	state = {
		show: false
	};


	 componentWillMount(){
    this.setState({width: window.innerWidth});
    if(window.innerWidth > 768 ){
    	this.setState({show: true});

    }
  }

	componentDidMount(){
		window.addEventListener("resize", this.updateDimensions.bind(this));
	}

	shouldComonentUpdate(nextProps, nextState){
		return true
	}

	
	componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    if(window.innerWidth > 768 ){
    	this.setState({show: true});
    	return;
    } 
    this.setState({show: false});
  }


	render(){
	 	console.log(window.location.pathname)
		return(
			<div className="header">
				<VeilWorkaround/>
				<Menu show={this.state.show} closeMenu={this.closeMenu}/>
				<button className={"mobile-menu-btn " + (this.state.show ? 'active' : null)} onClick={this.handleClick}>
					<span></span>
				</button>
				<div className={window.location.pathname === "/kids" ? "logoKidsBlock" : "logoBlock"}/>
			</div>
		)
	}

	handleClick = () => {
		if(window.innerWidth > 768 ) return;
	

		this.setState({
			show: !this.state.show
		})
	}

	closeMenu = () => {
		if(window.innerWidth > 768 ) return;
		
		this.setState({
			show: false
		})
	}
}

export default Header