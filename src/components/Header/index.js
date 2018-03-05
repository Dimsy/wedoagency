import React, {Component} from 'react';
import {connect} from 'react-redux';
import Menu from './Menu';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';

class Header extends Component {
	state = {
		show: false
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
		this.setState({
			show: !this.state.show
		})
	}

	closeMenu = () => {
		this.setState({
			show: false
		})
	}
}

export default Header