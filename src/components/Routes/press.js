import React, {Component} from 'react';
import Portfolio from '../Portfolio';
import PressList from '../PressList';
import Instagram from '../Instagram';

class RoutePressList extends Component {

	render(){
		
		return (
			<div>
				<PressList location={this.props.location} match={this.props.match}/>
				<Portfolio location={this.props.location} match={this.props.match}/>
				<Instagram/>
			</div>
		)
	}
}

export default RoutePressList
