import React, {Component} from 'react';
import TopMenu from './TopMenu';
import SocialMenu from './SocialMenu';
import LangSwitcher from './LangSwitcher'
import {connect} from 'react-redux';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import Socials from '../Socials/Socials';


class Menu extends Component{
	
	render(){
		if (!this.props.show)	{
			return null
		}					

		const { loading, error, contacts} = this.props;

		if (error) return (<ErrorCmp error={error} />);
		if (loading) return <Loader/>;		

		const mobile = window.innerWidth < 768 ? true : false

		const phone = mobile ? <li className="mobileTopMenuPhone">{contacts.acf.Phone} (viber/whatsapp)</li> : null
		const email = mobile ? <li className="mobileTopMenuMail"><a href={`mailto:${contacts.acf.mail}`}>{contacts.acf.mail}</a></li> : null

		const mobileContacts = phone && email ? <ul className="mobileTopMenuContacts">{phone}{email}</ul> : null				

		return (
			<div className="headerTopLine">
					<TopMenu closeMenu={this.props.closeMenu}/>
				<LangSwitcher closeMenu={this.props.closeMenu}/>
					{mobileContacts}
					<Socials placementClass='headerSocialMenu'/>
				<div className="clear" />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		contacts: state.contacts.entities,
		loading: state.contacts.loading,
		error: state.contacts.error
	}
}


export default connect(mapStateToProps)(Menu)