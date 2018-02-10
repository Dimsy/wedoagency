import React, {Component} from 'react';
import {connect} from 'react-redux';
import Menu from './Menu';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';

class Header extends Component {

	render(){

		return(
			<div className="header">
				<Menu />
				<div className="logoBlock"/>
				<div className="headerImgBlock"/>
			</div>
		)

	}
}

export default Header