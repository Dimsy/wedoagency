import React, {Component} from 'react';
import Portfolio from '../Portfolio';
import AgencyPage from '../AgencyPage';

class RouteAgencyPage extends Component {

	render(){
		
		return (
			<div>
				<AgencyPage location={this.props.location} match={this.props.match}/>
				<Portfolio />
			</div>
		)
	}
}

export default RouteAgencyPage
