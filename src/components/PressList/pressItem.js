import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class PressItem extends Component{
	state = {
		show: false
	}

	render(){
		const {item, match } = this.props
	
		const background = {
			backgroundImage: `-webkit-image-set( url(${item.acf.foto}) 1x, url(${item.acf.Fotox2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${item.acf.foto}) 1x, url(${item.acf.Fotox2}) 2x )`,
			backgroundImage: `-o-image-set( url(${item.acf.foto}) 1x, url(${item.acf.Fotox2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${item.acf.foto}) 1x, url(${item.acf.Fotox2}) 2x )`,
			backgroundImage: `url(${item.acf.foto})`
		};	

		const body = window.innerWidth > 768 ? <div className="pressItem__Inner">
																						 	<div className="pressItem__Inner-title">
																						  	{item.title.rendered}
																							</div>
																							<div className="pressItem__Inner-date">
																								{item.acf.date}
																							</div>
																						</div>
																				 : null	


									
		return (
				<Link to={`${match.path}/${item.id}`}>
					<div className="pressItem" style={background} onMouseEnter={this.handlerMouseEnter} onMouseLeave={this.handlerMouseLeave}>
						{ this.state.show && body }
					</div>
				</Link>
		)
	}

	handlerMouseEnter = e => {
			this.setState({
				show: true
			})
		}

	handlerMouseLeave = e => {
		this.setState({
			show: false
		})
	}
}

export default PressItem