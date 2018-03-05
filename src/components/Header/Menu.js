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
					<TopMenu />
					<LangSwitcher />
					<SocialMenu />	
				<div className="clear" />
			</div>
		)
	}
}

export default Menu