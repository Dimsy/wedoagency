import React, {Component} from 'react';
import NewsList from '../NewsList';
import Portfolio from '../Portfolio';

class RouteNews extends Component{
	render (){
		return (
			<div>
				<NewsList location={this.props.location} match={this.props.match}/>
				<Portfolio location={this.props.location} match={this.props.match}/>
			</div>
		)
	}
}

export default RouteNews