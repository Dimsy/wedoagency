import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loader from '../Loader'
import Error from '../Error'
import NewsItem from './NewsItem'

function NewsCat(props){
	const {news} = props				

	const News = news.map(item => <li key={item.id}><NewsItem item={item} /></li>)

	return(
		<div>
			<ul>
			 	{News}
			</ul>
		</div>
	)
}

export default NewsCat