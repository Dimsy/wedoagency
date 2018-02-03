import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loader from '../Loader'
import Error from '../Error'
import renderHTML from 'react-render-html'
import Intl from 'intl'

class NewsItem extends Component{
	state = {
		isOpen: false
	}

	render(){
		const {item} = this.props
		
		const date = new Date(item.date)

		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();

		const datePublish = ('0' + day).slice(-2) + "." + ('0' + month).slice(-2) + "." + year
		
		const fullNews = (this.state.isOpen && item.acf.fullNews) ? renderHTML(item.acf.fullNews) : null
		const toggleOpen = this.state.isOpen ? 'Скрыть' : 'Подробнее'

		return(
			<div className="newsItem">
			 <h1 className="gray">{datePublish}</h1>
			  <h2 className="dark">{item.title.rendered}</h2>
			  <p>{renderHTML(item.content.rendered)}</p>
			  <p>{fullNews}</p>
			  <div className="read green" onClick={this.handleClick}>{toggleOpen}</div>
			</div>		
		)
	}

	handleClick = ev => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}
}

export default NewsItem