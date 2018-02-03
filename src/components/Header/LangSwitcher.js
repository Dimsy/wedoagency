import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeLangRu, changeLangEn} from '../../ducks/lang';

class LangSwitcher extends Component{
	render(){

		return (
			<ul className="headerLangSwitcher">
				<li onClick={this.props.changeLangRu}>
					ru
				</li>
				<li>|</li>
				<li onClick={this.props.changeLangEn}>
					en
				</li>
			</ul>
		)
	}
}

export default connect(null, {changeLangRu, changeLangEn})(LangSwitcher);