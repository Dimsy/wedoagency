import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class PortfolioListItem extends Component{
	state = {
	 	show: false
	}

	render(){
		const { item, match } = this.props;

		const background = {
			backgroundImage: `-webkit-image-set( url(${item.acf.StartFoto}) 1x, url(${item.acf.StartFotox2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${item.acf.StartFoto}) 1x, url(${item.acf.StartFotox2}) 2x )`,
			backgroundImage: `-o-image-set( url(${item.acf.StartFoto}) 1x, url(${item.acf.StartFotox2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${item.acf.StartFoto}) 1x, url(${item.acf.StartFotox2}) 2x )`,
			backgroundImage: `url(${item.acf.StartFoto})`
		};	


		if(Object.keys(item).length === 0) {
			return null
		}

		const body =  <Link to={`${match.path}/${item.id}`}>
										<div className="portfolioListItem__Info">
											
		 							   		<div className="portfolioItem__info-data">{item.title.rendered}</div>
 											
 											  <div className="news__info-itemdata portfolioItem__date">
								     			{item.acf.DataOfFinnish}
								      	</div>
								    	
		 						   </div>
		 						 </Link>  

		return (
				<div className="portfolioList__item" style={background} onMouseEnter={this.handlerMouseEnter} onMouseLeave={this.handlerMouseLeave}>
					{body}
				</div>
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

export default PortfolioListItem