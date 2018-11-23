import React, {Component} from 'react';
import Portfolio from '../Portfolio';
import PortfolioPage from '../PortfolioPage';
import Instagram from '../Instagram';

class RoutePortfolioPage extends Component {

	render(){
		console.log("this.props.location",this.props.location)
		return (
			<div>
				<PortfolioPage location={this.props.location} match={this.props.match}/>
				<Portfolio location={this.props.location} match={this.props.match}/>
				<Instagram/>
			</div>
		)
	}
}

export default RoutePortfolioPage
