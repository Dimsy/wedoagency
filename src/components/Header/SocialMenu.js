import React, {Component} from 'react';
import {PATH} from '../../config';

class SocialMenu extends Component{
	render(){
		
		return (
			<ul className="headerSocialMenu">
				<li>
					<a href="http://vk.com" target="blank">   
						<img src={`${PATH}/img/social/vk.svg`} />
					</a>
				</li>
				<li>
					<a href="http:instagram.com"  target="blank">   
						<img src={`${PATH}/img/social/instagram.svg`}/>
					</a>
				</li>
				<li>
					<a href="http://facebook.com"  target="blank">   
						<img src={`${PATH}/img/social/fb.svg`} />
					</a>
				</li>
			</ul>
		)
	}
}

export default SocialMenu;