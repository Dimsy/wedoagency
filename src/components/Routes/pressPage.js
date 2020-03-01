import React, {Component} from 'react';
import Portfolio from '../Portfolio';
import PressPage from '../PressPage';

class RoutePressPage extends Component {

	render(){
		console.log('INTO', 'RoutePressPage')
		return (
			<div>
				<PressPage location={this.props.location} match={this.props.match}/>
				<Portfolio location={this.props.location} match={this.props.match}/>
			</div>
		)
	}
}

export default RoutePressPage
