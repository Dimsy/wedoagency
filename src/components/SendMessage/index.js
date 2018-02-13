import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import Form from './Form';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import {sendForm} from '../../ducks/form';

class SendMessage extends Component{

	submit = (values) => {
		this.props.sendForm(values)
	}

	render(){
		const {contacts, error, loading, useLang} = this.props;

		if (loading || !contacts || !contacts.acf.Phone) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);		

		return (
			<Grid className="sendMessage">
				<Row>
					<Col md={1}></Col>
					<Col md={5}>
						<h4>{contacts.acf.contactsText}</h4>
						<Row>
							<Col md={4}>
								<h5>{contacts.acf.addressText}</h5>
							</Col>
							<Col md={8}>
								<p>{contacts.content.rendered}</p>
							</Col>
						</Row>
						<Row>
							<Col md={4}>
								<h5>{contacts.acf.phoneText}</h5>
							</Col>
							<Col md={8}>
								<p>{contacts.acf.Phone} <br />
								( viber / whatsapp)</p>
							</Col>
						</Row>
						<Row>
							<Col md={4}>
								<h5>{contacts.acf.emailText}</h5>
							</Col>
							<Col md={8}>
								<p>{contacts.acf.mail}</p>
							</Col>
						</Row>
					</Col> 
					<Col md={6}>
						<h4>{contacts.acf.writeText}</h4>
							<Form onSubmit={this.submit} 
										useLang={useLang}
										yourNamePlaceholder={contacts.acf.yourNamePlaceholder} 
										youMessagePlaceholder={contacts.acf.youMessagePlaceholder}
										emailPlaceholder={contacts.acf.emailPlaceholder}
										sendButtonText={contacts.acf.sendButtonText}/>
					</Col> 
				</Row>
			</Grid>
		)
	}
}

const mapStateToProps = state => {
	return {
		useLang: state.lang.useLang,
		contacts: state.contacts.entities,
		error: state.contacts.error,
		loading: state.contacts.loading
	}
}

export default connect(mapStateToProps, {sendForm})(SendMessage);