import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import Form from './Form';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';

class SendMessage extends Component{

	render(){
		const {contacts, error, loading} = this.props;

		if (loading || !contacts || !contacts.acf.Phone) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);		

		console.log('contacts', this.props);

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
										yourNamePlaceholder={contacts.acf.yourNamePlaceholder} 
										emailText={contacts.acf.emailText} 
										youMessagePlaceholder={contacts.acf.youMessagePlaceholder}
										sendButtonText={contacts.acf.sendButtonText}/>
					</Col> 
				</Row>
			</Grid>
		)
	}
}

const mapStateToProps = state => {
	return {
		contacts: state.contacts.entities,
		error: state.contacts.error,
		loading: state.contacts.loading
	}
}

export default connect(mapStateToProps)(SendMessage);