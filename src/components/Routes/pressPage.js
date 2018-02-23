import React, {Component} from 'react';
import Portfolio from '../Portfolio';
import PressPage from '../PressPage';

class RoutePressPage extends Component {

	render(){
		
		return (
			<div>
				<PressPage location={this.props.location} match={this.props.match}/>
				<Portfolio />
			</div>
		)
	}
}

export default RoutePressPage
