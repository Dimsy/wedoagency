import React from 'react';
import Header from '../Header';
import Agency from '../Agency';
import Portfolio from '../Portfolio';
import Press from '../Press';

export default function RouteRoot(props){
	return (
		<div>
			<Header/>
			<Agency />
			<Portfolio />
			<Press />
		</div>
	)
}