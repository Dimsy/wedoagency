import React, {Component} from 'react';
import Portfolio from '../Portfolio';
import PortfolioPage from '../PortfolioPage';

class RoutePortfolioPage extends Component {

	render(){
		
		return (
			<div>
				<PortfolioPage location={this.props.location} match={this.props.match}/>
				<Portfolio location={this.props.location} match={this.props.match}/>
			</div>
		)
	}
}

export default RoutePortfolioPage
