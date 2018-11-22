import React, {Component} from 'react';
import Portfolio from '../Portfolio';
import AgencyPage from '../AgencyPage';
import Awards from '../Awards';
import Instagram from '../Instagram';

export default function RouteAgencyPage(props){
	return (
		<div>
			<AgencyPage location={props.location} match={props.match}/>
			<Awards />
			<Instagram/>
		</div>
	)
}
