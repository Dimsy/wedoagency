import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import Loader from '../Loader'
import Error from '../Error'
import NewsCat from './NewsCat'
import {loadNews, toggleNews} from '../../ducks/news'
import {NEWS, SHORT, LONG} from '../../config'
import {Redirect, Switch } from 'react-router-dom'
import scrollToElement from 'scroll-to-element'

class News extends Component{

	componentDidMount(){
		this.props.loadNews(NEWS, SHORT)
		var elem = document.querySelector('body');
		this.props.location.pathname =='/news' ? scrollToElement(ReactDOM.findDOMNode(this)) : scrollToElement(elem)
	}

	render(){
	
		const {loading, isOpen, news, error} = this.props
		
		if (error) return <Error error={error} />		
		if (loading) return <Loader />

		const toggleOpen = isOpen ? LONG : SHORT
		
		return(
			<section className="news">
				<div className="news_block">
				 	<h1 className="dark">Новости</h1>
			
				 	<NewsCat news={news.take(toggleOpen).valueSeq().toArray()} />
				 	<div className="showAll">
						<p onClick={this.handleClick}>{!this.props.isOpen ? "Показать всё" : "Скрыть"}</p>
					</div>
				</div>

			</section>
		)
	}

	handleClick = ev => {
		this.props.toggleNews()
	}
}

const mapStateToProps = state => {

	return {
		news: state.news.entities,
		isOpen: state.news.isOpen,
		loading: state.news.loading,
		error: state.news.error
	}
}

export default connect(mapStateToProps, {loadNews, toggleNews})(News)