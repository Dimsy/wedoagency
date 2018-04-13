import React, {Component} from 'react';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';
import RenderedField from '../Forms/RenderedField';
import { rusEmail, enEmail, 
				 rusTextOnly, enTextOnly,
				 rusTextNumbers, enTextNumbers,
				 ruMinLength3, enMinLength3,
				 ruMinLength20, enMinLength20,
				 ruMaxLength30, enMaxLength30, 
				 ruMaxLength300, enMaxLength300,
				 rusRequired, enRequired	} from '../Forms/validate.js';


class Form extends Component{
	render(){
		const { handleSubmit, pristine, reset, submitting,
						yourNamePlaceholder, youMessagePlaceholder, emailPlaceholder, sendButtonText, useLang } = this.props
		
		const required 		= useLang == 'ru' ? rusRequired 			: enRequired;
		const email 		= useLang == 'ru' ? rusEmail 					: enEmail;
		const textOnly 		= useLang == 'ru' ? rusTextOnly 			: enTextOnly;
		const textNumbers 	= useLang == 'ru' ? rusTextNumbers		: enTextNumbers;
		const minLength3  	= useLang == 'ru' ? ruMinLength3 			: enMinLength3;
		const minLength20 	= useLang == 'ru' ? ruMinLength20 		: enMinLength20;
		const maxLength30 	= useLang == 'ru' ? ruMaxLength30   	: enMaxLength30;
		const maxLength300 	= useLang == 'ru' ? ruMaxLength300   	: enMaxLength300;


		return (
			<form onSubmit={handleSubmit}>
				<Field name="name" type="text" 
					component={RenderedField} 
					placeholder={yourNamePlaceholder} 
					validate={[required, textOnly, minLength3, maxLength30]}
				/>
				<Field name="email" type="text" 
					component={RenderedField} 
					placeholder={emailPlaceholder}
					validate={[required, email]}
				/>
				<Field name="message" type="text" 
					component={RenderedField}  
					placeholder={youMessagePlaceholder} 
					validate={[required, textNumbers, minLength20, maxLength300]}
				/>
				<button type="submit" disabled={submitting}>{sendButtonText}</button>
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