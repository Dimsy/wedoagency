import React, {Component} from 'react';
import Portfolio from '../Portfolio';
import PressList from '../PressList';

class RoutePressList extends Component {

	render(){
		
		return (
			<div>
				<PressList location={this.props.location} match={this.props.match}/>
				<Portfolio />
			</div>
		)
	}
}

export default RoutePressList
