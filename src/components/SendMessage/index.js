import React, {Component} from 'react';
import {connect} from 'react-redux';
import Form from './Form';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import {sendCustomForm} from '../../ducks/form';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import $ from "jquery";
import {Helmet} from "react-helmet";

class SendMessage extends Component{

	submit = (values) => {
		this.props.sendCustomForm(values)
	};

	render(){
		const {contacts, error, loading, useLang} = this.props;

		if (loading || !contacts || !contacts.acf.Phone) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);
        //document.getElementById('veil').style.visibility = "hidden";


		return (
			<div className="container sendMessage">
                <Helmet>
                    <title>WeDoAgency | {contacts.acf.contactsText}</title>
                </Helmet>
				<ReactCSSTransitionGroup transitionName="anim" 
					 transitionAppear={true}
					 transitionAppearTimeout={2000}
					 transitionEnter={false}
					 transitionLeave={false}>
					<div className="row">
						<div className="col-lg-5 offset-lg-1 col-md-6">
							<h1>{contacts.acf.contactsText}</h1>
							<div className="row">
								<div className="col-md-3" >
									<h5>{contacts.acf.addressText}</h5>
								</div>
								<div className="col-md-9">
									<div dangerouslySetInnerHTML={{ __html: contacts.content.rendered }} />
								</div>
							</div>
							<div className="row">
								<div className="col-md-3">
									<h5>{contacts.acf.phoneText}</h5>
								</div>
								<div className="col-md-9 footer__contacts">
									<p  style={{padding: '5px'}}><a href={`tel:${contacts.acf.Phone}`}>{contacts.acf.Phone}</a> <br />
									( viber / whatsapp)</p>
								</div>
							</div>
							<div className="row">
								<div className="col-md-3">
									<h5>{contacts.acf.emailText}</h5>
								</div>
								
								<div className="col-md-9">
									<p className="footer__contacts" style={{padding: '5px'}}>
										<a className="footer__mail" href={`mailto:${contacts.acf.mail}`}>{contacts.acf.mail}</a>
									</p>
								</div>
								
							</div>
						</div> 
						<div className="col-md-6">
							<h1>{contacts.acf.writeText}</h1>
							<Form	onSubmit={this.submit}
									useLang={useLang}
								 	contacts={contacts}
									yourNamePlaceholder={contacts.acf.yourNamePlaceholder}
									youMessagePlaceholder={contacts.acf.youMessagePlaceholder}
									emailPlaceholder={contacts.acf.emailPlaceholder}
									sendButtonText={contacts.acf.sendButtonText}/>
						</div> 
					</div>
				</ReactCSSTransitionGroup>	
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

export default connect(mapStateToProps, {sendCustomForm})(SendMessage);