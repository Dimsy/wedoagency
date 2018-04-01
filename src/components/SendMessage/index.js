import React, {Component} from 'react';
import {connect} from 'react-redux';
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
			<div className="container sendMessage">
				<div className="row">
					<div className="col-md-5 offset-md-1">
						<h4>{contacts.acf.contactsText}</h4>
						<div className="row">
							<div className="col-md-4" >
								<h5>{contacts.acf.addressText}</h5>
							</div>
							<div className="col-md-8">
								<div dangerouslySetInnerHTML={{ __html: contacts.content.rendered }} />
							</div>
						</div>
						<div className="row">
							<div className="col-md-4">
								<h5>{contacts.acf.phoneText}</h5>
							</div>
							<div className="col-md-8">
								<p>{contacts.acf.Phone} <br />
								( viber / whatsapp)</p>
							</div>
						</div>
						<div className="row">
							<div className="col-md-4">
								<h5>{contacts.acf.emailText}</h5>
							</div>
							
							<div className="col-md-8">
								<p>
									{contacts.acf.mail}
								</p>
							</div>
							
						</div>
					</div> 
					<div className="col-md-6">
						<h4>{contacts.acf.writeText}</h4>
							<Form onSubmit={this.submit} 
										useLang={useLang}
										yourNamePlaceholder={contacts.acf.yourNamePlaceholder} 
										youMessagePlaceholder={contacts.acf.youMessagePlaceholder}
										emailPlaceholder={contacts.acf.emailPlaceholder}
										sendButtonText={contacts.acf.sendButtonText}/>
					</div> 
				</div>
			</div>
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