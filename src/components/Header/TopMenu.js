import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from '../Loader';
import MenuItem from './MenuItem';
import ErrorCmp from '../ErrorCmp';

class TopMenu extends Component{
	render(){
		const {	entities, loading, error, closeMenu} = this.props;

		if (error ) return (<ErrorCmp error={error} />);
		if (loading) return <Loader/>;

		const menu = entities.toArray();
		const body = menu.map( item => <li key={item.ID}><MenuItem item={item} closeMenu={this.props.closeMenu}/></li>);		
		
		return (
			<div className="headerTopMenu">
			<ul className="headerTopMenuList">
				{body}
			</ul>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		entities: state.menu.entities,
		loading: state.menu.loading,
		error: state.menu.error
	}
}

export default connect(mapStateToProps)(TopMenu);