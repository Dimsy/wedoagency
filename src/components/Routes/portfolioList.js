import React, {Component} from 'react';
import PortfolioList from '../PortfolioList';

class RoutePortfolioList extends Component{
	render (){
		return (
			<div>
				<PortfolioList location={this.props.location} match={this.props.match}/>
			</div>
		)
	}
}

export default RoutePortfolioList