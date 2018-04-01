import React from 'react';
import SendMessage from '../SendMessage';
import Portfolio from '../Portfolio';

export default function RouteContacts(props){


	return (
		<div>
			<SendMessage />
			<Portfolio location={props.location} match={props.match}/>
		</div>
	)
}