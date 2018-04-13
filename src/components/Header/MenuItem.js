import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class MenuItem extends Component{
	render(){
		const {item, closeMenu} = this.props

		return(
			<Link to={item.url} onClick={closeMenu}>
				{item.title}
	 		</Link>
		)
	}
}

export default MenuItem;