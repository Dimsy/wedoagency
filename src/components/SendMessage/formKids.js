import React, {Component} from 'react';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';
import RenderedField from '../Forms/RenderedField';
import {sendCustomForm} from '../../ducks/form';
import { rusEmail, enEmail, 
				 rusTextOnly, enTextOnly,
				 rusTextNumbers, enTextNumbers,
    rusPhone, enPhone,
				 ruMinLength3, enMinLength3,
				 ruMinLength20, enMinLength20,
				 ruMaxLength30, enMaxLength30, 
				 ruMaxLength300, enMaxLength300,
				 rusRequired, enRequired	} from '../Forms/validate.js';


class Form extends Component{
	state = {
		name: '',
		phone: '',
        message: '',
        nameTouched: false,
        phoneTouched: false,
		messageTouched: false
	};

    submit = (values) => {
        sendCustomForm({
            name: this.state.name,
            phone: this.state.phone,
            message: this.state.message
        })
    };

	setName = (event) => this.setState({'name': event.target.value});
    setNameWasTouched = () => this.setState({'nameTouched': true});

	setEmail = (event) => this.setState({'email': event.target.value});
    setEmailWasTouched = () => this.setState({'emailTouched': true});

    setPhone = (event) => this.setState({'phone': event.target.value});
    setPhoneWasTouched = () => this.setState({'phoneTouched': true});

    setMessage = (event) => this.setState({'message': event.target.value});
    setMessageWasTouched = () => this.setState({'messageTouched': true});

	render(){

		const { handleSubmit, pristine, reset, submitting,
						yourNamePlaceholder, youMessagePlaceholder, emailPlaceholder, sendButtonText, useLang } = this.props;
		
		const required 		= useLang == 'ru' ? rusRequired 			: enRequired;
		const email 		= useLang == 'ru' ? rusEmail 					: enEmail;
		const textOnly 		= useLang == 'ru' ? rusTextOnly 			: enTextOnly;
		const textNumbers 	= useLang == 'ru' ? rusTextNumbers		: enTextNumbers;
		const minLength3  	= useLang == 'ru' ? ruMinLength3 			: enMinLength3;
		const minLength20 	= useLang == 'ru' ? ruMinLength20 		: enMinLength20;
		const maxLength30 	= useLang == 'ru' ? ruMaxLength30   	: enMaxLength30;
		const maxLength300 	= useLang == 'ru' ? ruMaxLength300   	: enMaxLength300;
		const phone = useLang == 'ru' ? rusPhone : enPhone;

        const nameError = rusRequired(this.state.name) || textOnly(this.state.name) || minLength3(this.state.name) || maxLength30(this.state.name);
        const emailError = rusRequired(this.state.email) || email(this.state.email);
        const phoneError = rusRequired(this.state.phone) || phone(this.state.phone);
        const messageError = rusRequired(this.state.message) || textNumbers(this.state.message) || minLength20(this.state.message) || maxLength300(this.state.message);
        const formError = !nameError && !phoneError && !messageError;

        return (
			<form onSubmit={handleSubmit(this.submit)} name="contacts" className="latoFont">
				<input
                    name="name"
					type="text"
                    placeholder={ yourNamePlaceholder }
					value={this.state.name}
					onChange={this.setName}
                    onBlur={this.setNameWasTouched}
				/>
				{!!this.state.name && this.state.nameTouched &&
					<div>
						<span className="error">
							{nameError}
						</span>
					</div>
				}
                <input
                    name="phone"
                    type='text'
                    placeholder={ emailPlaceholder }
                    value={this.state.phone}
                    onChange={this.setPhone}
                    onBlur={this.setPhoneWasTouched}
				/>
                {!!this.state.phone && this.state.phoneTouched &&
					<div>
						<span className="error">
							{phoneError}
						</span>
					</div>
                }
                <textarea
                    name="message"
                    type='text'
                    placeholder={ youMessagePlaceholder }
                    value={this.state.message}
                    onChange={this.setMessage}
                    onBlur={this.setMessageWasTouched}
				/>
                {!!this.state.message && this.state.messageTouched &&
					<div>
						<span className="error">
							{messageError}
						</span>
					</div>
                }
                <br/>
				<button type="submit" disabled={!formError}>{sendButtonText}</button>
			</form>
		)
	}
}

const afterSubmit = (result, dispatch, props) => {
	const resultText = props.useLang == 'ru' ? "Ваше сообшение отправлено!" : "Your message was send!";
	alert(resultText)
	dispatch(reset('contacts'))
}

export default reduxForm({
													form: 'contacts',
													onSubmitSuccess: afterSubmit
												})
												(Form)