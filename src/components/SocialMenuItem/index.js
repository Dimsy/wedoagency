import React, {Component} from 'react'
//import {PATH} from '../../config'

class SocialMenuItem extends Component {
	state = {
		hover: false
	};
	
	toggleHover = () => {
		this.setState(
			{ hover: !this.state.hover }
		)
	};
	
	render(){
	const {item} = this.props;
	const PATH = 'https://wedoagency.ru/wp-content/themes/wp_theme'
	const divStyle = {
		backgroundImage: `-webkit-image-set( url(${PATH}/img/social/${item.title}.svg) 1x, url(${PATH}/img/social/${item.title}.svg) 2x )`,
		backgroundImage: `-moz-image-set( url(${PATH}/img/social/${item.title}.svg) 1x, url(${PATH}/img/social/${item.title}.svg) 2x )`,
		backgroundImage: `-o-image-set( url(${PATH}/img/social/${item.title}.svg) 1x, url(${PATH}/img/social/${item.title}.svg) 2x )`,
		backgroundImage: `-ms-image-set( url(${PATH}/img/social/${item.title}.svg) 1x, url(${PATH}/img/social/${item.title}.svg) 2x )`,
		backgroundRepeat: `no-repeat`,
		backgroundPosition: `center center`,
		backgroundImage: `url(${PATH}/img/social/${item.title}.svg)`,
		color: `#939597`
	};

   	const divStyleHover = {
     	backgroundImage: `-webkit-image-set( url(${PATH}/img/social/hover/${item.title}.svg) 1x, url(${PATH}/img/social/hover/${item.title}.svg) 2x )`,
		backgroundImage: `-moz-image-set( url(${PATH}/img/social/hover/${item.title}.svg) 1x, url(${PATH}/img/social/hover/${item.title}.svg) 2x )`,
   		backgroundImage: `-o-image-set( url(${PATH}/img/social/hover/${item.title}.svg) 1x, url(${PATH}/img/social/hover/${item.title}.svg) 2x )`,
   		backgroundImage: `-ms-image-set( url(${PATH}/img/social/hover/${item.title}.svg) 1x, url(${PATH}/img/social/hover/${item.title}.svg) 2x )`,
   		backgroundRepeat: `no-repeat`,
   		backgroundPosition: `center center`,
   		backgroundImage: `url(${PATH}/img/social/hover/${item.title}.svg)`,
		color: `#131313`
   	};
		
   	const style = !this.state.hover ? divStyle : divStyleHover;

		return(
			<li className={item.title}>
				<a
					href={item.url}
					target="blank"
					onMouseEnter={this.toggleHover}
					onMouseLeave={this.toggleHover}
					style={style}
				/>
			</li>
		)

	}

}

export default SocialMenuItem