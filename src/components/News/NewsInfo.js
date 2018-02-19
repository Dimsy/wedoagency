import React, {Component} from 'react'

class NewsItem extends Component {
	state = {
		show: false
	}

	render(){
		const {item, useLang} = this.props;

		const date =  new Date(item.date);
		
		var options = {
		  day: 'numeric',
		  month:  'numeric',
		  year: 'numeric'
		};

		const body = <div className="news__Info">
								   <div className="news__info-item">{item.title.rendered}</div>
								   <div className="news__info-itemdata ">{ date.toLocaleString( 'en-GB', options)}</div>
								 </div>

		return(
			<div className="news__wrapper" onMouseEnter={this.handlerMouseEnter} onMouseLeave={this.handlerMouseLeave}>
		 			<img src={item.acf.StartFoto} srcSet={item.acf.StartFotox2} className="news__img"/>
		 			{this.state.show && body}
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

export default NewsItem