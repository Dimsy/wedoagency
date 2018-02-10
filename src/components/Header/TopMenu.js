import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from '../Loader';
import MenuItem from './MenuItem';

class TopMenu extends Component{
	render(){
		const {entities, loading, error} = this.props;


		if (error) return (<ErrorCmp error={error} />);
		if (loading) return <Loader/>;

		const body = entities.map( item => <li key={item.ID}><MenuItem item={item}/></li>);
		
		return (
			<ul className="headerTopMenu">
				{body}
			</ul>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		entities: state.menu.entities.toArray(),
		loading: state.menu.loading,
		error: state.menu.error
	}
}

export default connect(mapStateToProps)(TopMenu);