import React from 'react';
import SendMessage from '../SendMessage';
import Portfolio from '../Portfolio';

import Instagram from '../Instagram';
export default function RouteContacts(props){


	return (
		<div>
			<SendMessage />
			<Portfolio location={props.location} match={props.match}/>
			<Instagram/>
		</div>
	)
}