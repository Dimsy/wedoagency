import React, {Component} from 'react';
import TopMenu from './TopMenu';
import SocialMenu from './SocialMenu';
import LangSwitcher from './LangSwitcher'

class Menu extends Component{
	
	render(){

		console.log('--', this.props)

		if (!this.props.show)	{
			return null
		}														


		return (
			<div className="headerTopLine">
					<TopMenu closeMenu={this.props.closeMenu}/>
					<LangSwitcher closeMenu={this.props.closeMenu}/>
					<SocialMenu closeMenu={this.props.closeMenu}/>	
				<div className="clear" />
			</div>
		)
	}
}

export default Menu