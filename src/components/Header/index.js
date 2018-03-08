import React, {Component} from 'react';
import {connect} from 'react-redux';
import Menu from './Menu';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';

class Header extends Component {
	state = {
		show: false,
		width: 0
	}

	 componentWillMount(){
    this.setState({width: window.innerWidth});
    if(window.innerWidth > 768 ){
    	this.setState({show: true});
    }
  }

	render(){
		return(
			<div className="header">
				<Menu show={this.state.show} closeMenu={this.closeMenu}/>
				<button className={"mobile-menu-btn " + (this.state.show ? 'active' : null)} onClick={this.handleClick}>
					<span></span>
				</button>
				<div className="logoBlock"/>
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