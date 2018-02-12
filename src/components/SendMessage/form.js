import React, {Component} from 'react';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';
import RenderedField from '../Forms/RenderedField';
import {required, email, minLength3, minLength20, maxLength30, maxLength300, rusTextOnly, rusTextNumbers} from '../Forms/validate.js';


class Form extends Component{
	render(){
		const { handleSubmit, pristine, reset, submitting,
						yourNamePlaceholder, youMessagePlaceholder, emailText, sendButtonText } = this.props
		
		return (
			<form onSubmit={handleSubmit}>
				<Field name="name" type="text" 
					component={RenderedField} 
					placeholder={yourNamePlaceholder} 
					validate={[required, rusTextOnly, minLength3, maxLength30]}
				/>
				<Field name="email" type="text" 
					component={RenderedField} 
					placeholder={emailText} 
					validate={[required, email]}
				/>
				<Field name="message" type="text" 
					component={RenderedField}  
					placeholder={youMessagePlaceholder} 
					validate={[required, rusTextNumbers, minLength20, maxLength300]}
				/>
				<button type="submit" disabled={submitting}>{sendButtonText}</button>
			</form>
		)
	}
}

const afterSubmit = (result, dispatch) => {
	alert("Ваше сообшение отправлено!")
	dispatch(reset('contacts'))
}

export default reduxForm({
													form: 'contacts',
													onSubmitSuccess: afterSubmit
												})
												(Form)