import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError, reset } from 'redux-form'
import { Input, Button, Message } from 'semantic-ui-react'
import RenderedField from '../Forms/RenderedField'
import {required, email, minLength3, minLength20, maxLength30, maxLength300, rusTextOnly, rusTextNumbers} from '../Forms/validate.js'


class ContactForm extends Component {
	render(){
		const { handleSubmit, pristine, reset, submitting } = this.props

		return(
			<form onSubmit={handleSubmit}>
				<Field name="name" type="text" 
					component={RenderedField} 
					label="Имя" 
					placeholder="Введите Ваше имя" 
					validate={[required, rusTextOnly, minLength3, maxLength30]}
				/>
				<Field name="email" type="text" 
					component={RenderedField} 
					label="E-mail" 
					placeholder="Введите Ваш e-mail" 
					validate={[required, email]}
				/>
				<Field name="message" type="text" 
					component={RenderedField} 
					label="Сообщение" 
					placeholder="Введите Ваше сообщение" 
					validate={[required, rusTextNumbers, minLength20, maxLength300]}
				/>
				<button type="submit" disabled={submitting}>Отправить</button>
			</form>
		)
	}
}

const afterSubmit = (result, dispatch) => {
	alert("Ваше сообшение отправлено!")
	dispatch(reset('contacts'))
}

export default 	reduxForm({
														form: 'contacts',
														onSubmitSuccess: afterSubmit,
															
													})
													(ContactForm)
												



































