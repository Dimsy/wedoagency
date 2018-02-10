import React from 'react';
import Header from '../Header';
import Agency from '../Agency';
import Portfolio from '../Portfolio';
import Press from '../Press';
import News from '../News';
import Instagram from '../Instagram';
import Footer from '../Footer'

export default function RouteRoot(props){
	return (
		<div>
			<Header/>
			<Agency />
			<Portfolio />
			<Press />
			<News />
			<Instagram />
			<Footer />
		</div>
	)
}