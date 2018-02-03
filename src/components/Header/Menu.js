import React, {Component} from 'react';
import TopMenu from './TopMenu';
import SocialMenu from './SocialMenu';
import LangSwitcher from './LangSwitcher'


const Menu = () => {
	return (
		<div className="headerTopLine">
			<TopMenu />
			<LangSwitcher />
			<SocialMenu />
			<div className="clear" />
		</div>
	)
}

export default Menu