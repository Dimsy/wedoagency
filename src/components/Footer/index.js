import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from '../Loader';
import { Grid, Row, Col } from 'react-bootstrap';
import ErrorCmp from '../ErrorCmp';
import {Link} from 'react-router-dom';
import {loadContacts} from '../../ducks/contacts.js';
import SocialFooter from './social';
import BackToTop from './backToTop';

class Footer extends Component{
	
	render(){

		const {useLang, menu, contacts, loading} = this.props

		if(loading || !menu || !contacts) return <Loader />;

		const menuSet = menu.toArray();

		if (menuSet.length === 0){
			return <div>Данные не доступны</div>
		}
		
		const body = menuSet.map(item =><li key={item.ID} className="menuFooter__Item"><Link to={item.url}>{item.title}</Link></li>)
		
		const labelLang = useLang == "ru" ? <p>Свадебное агeство "weDOagency"</p> : <p>Wedding agency "weDOagency"</p>
		const label = window.innerWidth < 768 ? <Col sm={12} className="footer__label">{labelLang}<p>2012-2018</p></Col> : null

		return(
			<div className="footer">
		
				<Grid>
					<Row>
						{label}
						<Col sm={6} md={6} lg={6} className="footer__menu">
							<ul>
								{body}
							</ul>
							<div className="clear"></div>
						</Col>
						<Col lg={4} md={6} sm={12} className="footer__contacts">
							{contacts.acf.callWrite}{contacts.acf.Phone}
							<br />
							(viber/whatsup)
							<br />
							<a href={contacts.acf.mail} className="footer__mail">{contacts.acf.mail}</a>
							<br />
							{contacts.content.rendered}
						</Col>
						<Col sm={12} lg={2} md={6} className="SocialFooterMd">
							<SocialFooter />
						</Col>				
					</Row>
				</Grid>	
				<hr />
				<Grid className="copyRight">
					<Row>
						<Col md={8} className="AllRightReserved">
							weDOagency © all right reserved
						</Col>
						<Col md={4}>
							<BackToTop  scrollStepInPx="50" delayInMs="16.66"/>							
						</Col>
					</Row>
				</Grid>
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