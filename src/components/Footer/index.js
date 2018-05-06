import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from '../Loader';
import { Grid, Row, Col } from 'react-bootstrap';
import ErrorCmp from '../ErrorCmp';
import {Link} from 'react-router-dom';
import {loadContacts} from '../../ducks/contacts.js';
import SocialFooter from './social';
import BackToTop from './backToTop';
import renderHTML from 'react-render-html';
import Socials from '../Socials/Socials';

class Footer extends Component{
	
	render(){

		const {useLang, menu, contacts, loading} = this.props

		if(loading || !menu || !contacts) return <Loader />;

		const menuSet = menu.toArray();

		if (menuSet.length === 0){
			return <div>Данные не доступны</div>
		}
		
		const body = menuSet.map(item =><li key={item.ID} className="menuFooter__Item"><Link to={item.url}>{item.title}</Link></li>)
		
		const labelLang = useLang == "ru" ? 'Свадебное агeство "weDOagency"' : 'Wedding agency "weDOagency"'
		const label = window.innerWidth < 768 ? <Col sm={11} className="col-11"><p className="footer__label">{labelLang}</p><p className="footer__label">2012-2018</p></Col> : null

		return(
			<div className="footer">
			
					<div className="container">
						<div className="row no-gutters">
					
						{label}
						<Col sm={6} md={6} lg={6} className="col-11">
							<ul className={"footer__menu"}>
								{body}
							</ul>
							<div className="clear"></div>
						</Col>
						
						<Col sm={11} md={6} lg={4} className="col-11">
							<div className="footer__contacts">
								{contacts.acf.callWrite}&nbsp;{contacts.acf.Phone}
								<br />
								(viber/whatsapp)
								<br />
								<a href={contacts.acf.mail} className="footer__mail">{contacts.acf.mail}</a>
								<br />
								{renderHTML( contacts.content.rendered)} 
							</div>
						</Col>
						<Col sm={11} lg={2} md={6} className="col-11" style={{float: 'right'}}>
							<div className="socialFooterContainer">
								<Socials placementClass='socialFooter'/>
							</div>
						</Col>		
					</div>
				</div>	
				<hr />
				<div className="container copyRight">
					<div className="row no-gutters">
						<div className="col-md-8 AllRightReserved latoFont">
							weDOagency © all right reserved
						</div>
						<div className="col-md-4">
							<BackToTop  scrollStepInPx="50" delayInMs="16.66"/>							
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		useLang: state.lang.useLang,
		menu: state.menu.entities,
		contacts: state.contacts.entities,
		loading: state.contacts.loading
	}
}

export default connect(mapStateToProps, {loadContacts})(Footer)