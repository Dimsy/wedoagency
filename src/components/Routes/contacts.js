import React from 'react';
import Header from '../Header';
import SendMessage from '../SendMessage';
import Portfolio from '../Portfolio';
import Instagram from '../Instagram';
import Footer from '../Footer';

export default function Contacts(props){
	return (
		<div>
			<Header/>
			<SendMessage />
			<Portfolio />
			<Instagram />
			<Footer />
		</div>
	)
}