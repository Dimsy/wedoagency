import React, {Component} from 'react';
import Portfolio from '../Portfolio';
import NewsArticle from '../NewsArticle';
import Instagram from '../Instagram';

class RouteNewsArticle extends Component {

	render(){
		
		return (
			<div>
				<NewsArticle location={this.props.location} match={this.props.match}/>
				<Portfolio match={this.props.match}/>
				<Instagram/>
			</div>
		)
	}
}

export default RouteNewsArticle
