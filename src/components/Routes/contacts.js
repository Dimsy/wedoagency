import React from 'react';
import Header from '../Header';
import SendMessage from '../SendMessage';
import Instagram from '../Instagram';
import Footer from '../Footer'

export default function Contacts(props){
	return (
		<div>
			<Header/>
			<SendMessage />
			<Instagram />
			<Footer />
		</div>
	)
}