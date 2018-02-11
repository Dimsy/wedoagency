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
	componentDidMount(){
    const useLang = this.props.useLang;
		this.props.loadContacts(useLang);
	}

	componentWillReceiveProps(nextProps){
		if(this.props.useLang != nextProps.useLang){
			this.props.loadContacts(nextProps.useLang)
    }
	}

	render(){

		const {useLang, menu, contacts, loading} = this.props

		if(loading || !menu || !contacts || !contacts.acf.Phone) return <Loader />;

		const menuSet = menu.toArray();
		
		const body = menuSet.map(item =><li key={item.ID} className="menuFooter__Item"><Link to={item.url}>{item.title}</Link></li>)

		return(
			<div className="footer">
				<Grid>
					<Row>
						<Col md={6}>
							<ul>
								{body}
							</ul>
							<div className="clear"></div>
						</Col>
						<Col md={4} className="footer__contacts">
							{contacts.acf.callWrite}{contacts.acf.Phone}
							<br />
							(viber/whatsup)
							<br />
							<a href={contacts.acf.mail}>{contacts.acf.mail}</a>
							<br />
							{contacts.content.rendered}
						</Col>
						<Col md={2}>
							<SocialFooter />
						</Col>
					</Row>
				</Grid>	
				<hr />
				<Grid>
					<Row>
						<Col md={10} className="AllRightReserved">
							weDOagency © all right reserved
						</Col>
						<Col md={2}>
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