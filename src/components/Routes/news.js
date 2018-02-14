import React from 'react';
import Header from '../Header';
import NewsList from '../NewsList';
import Portfolio from '../Portfolio';
import Instagram from '../Instagram';
import Footer from '../Footer';

export default function RouteNews(props){
	return (
		<div>
			<Header/>
			<NewsList />
			<Portfolio />
			<Instagram />
			<Footer />
		</div>
	)
}