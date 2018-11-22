import React, {Component} from 'react';
import PortfolioList from '../PortfolioList';
import Instagram from '../Instagram';

class RoutePortfolioList extends Component{
	render (){
		return (
			<div>
				<PortfolioList location={this.props.location} match={this.props.match}/>
				<Instagram/>
			</div>
		)
	}
}

export default RoutePortfolioList