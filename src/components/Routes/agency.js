import React, {Component} from 'react';
import Portfolio from '../Portfolio';
import AgencyPage from '../AgencyPage';
import Awards from '../Awards';

export default function RouteAgencyPage(props){
	return (
		<div>
			<AgencyPage location={props.location} match={props.match}/>
			<Awards />
		</div>
	)
}
