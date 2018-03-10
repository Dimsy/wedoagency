import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from '../Loader';
import MenuItem from './MenuItem';

class TopMenu extends Component{
	render(){
		const {
				entities, loading, error, closeMenu,
				contactsLoading, contactsError, contacts} = this.props;

		if (error || contactsError) return (<ErrorCmp error={error} />);
		if (loading || contactsLoading) return <Loader/>;

		const menu = entities.toArray();
		const body = menu.map( item => <li key={item.ID}><MenuItem item={item} closeMenu={this.props.closeMenu}/></li>);		
		const mobile = window.innerWidth < 768 ? true : false

		const phone = mobile ? <li className="mobileTopMenuPhone">{contacts.acf.Phone} (viber/whatsup)</li> : null
		const email = mobile ? <li className="mobileTopMenuMail"><a href={`mailto:${contacts.acf.mail}`}>{contacts.acf.mail}</a></li> : null

		return (
			<ul className="headerTopMenu">
				{body}
				{phone}
				{email}
			</ul>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		entities: state.menu.entities,
		loading: state.menu.loading,
		contacts: state.contacts.entities,
		contactsLoading: state.contacts.loading,
		contactsError: state.contacts.error,
		error: state.menu.error
	}
}

export default connect(mapStateToProps)(TopMenu);