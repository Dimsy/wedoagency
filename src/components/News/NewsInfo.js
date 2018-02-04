import React, {Component} from 'react'

class NewsItem extends Component {
	state = {
		show: false
	}

	render(){
		const {item} = this.props;

		const body = <div className="news__Info">
								   <div className="news__info-item">{item.title.rendered}</div>
								   <div className="news__info-itemdata ">{item.acf.DataOfFinnish}</div>
								 </div>

		return(
			<div className="news__wrapper" onMouseEnter={this.handlerMouseEnter} onMouseLeave={this.handlerMouseLeave}>
		 			<img src={item.acf.StartFoto} srcSet={item.acf.StartFotox2} srcSet={item.acf.StartFotox3} className="news__img"/>
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