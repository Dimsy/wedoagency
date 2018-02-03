import React, {Component} from 'react'
import {connect} from 'react-redux'
import YandexMap from './yandexMaps'
import ContactForm from './ContactForm'
import scrollToElement from 'scroll-to-element'
import Loader from '../Loader'
import {sendForm} from '../../AC'


class Contacts extends Component{
	componentDidMount(){
		var elem = document.querySelector('body');
		scrollToElement(elem)
	}

	render(){

		const {contacts, loading, error} = this.props

		if (loading ) return <Loader />
		if (error) return <ErrorCmp error={error} /> 

		return(
			<section className="info">
				<h1 className="dark">КОНТАКТЫ</h1>
				<div className="contacts">
					<div className="cont_item">
						<p className="green_light uppercase">Адрес: </p>
						<p>Россия, 141009, Московская обл., г. {contacts.title.rendered}, {contacts.acf.fullAddr}</p>
					</div>
				  <div className="cont_item">
						<p className="green_light uppercase">Телефон/факс: </p>	
							<p>{contacts.acf.phone1} (многоканальный)</p>
					</div>
					<div className="cont_item">
						<p className="green_light uppercase">e-mail: </p>	
							<p><a href={`"mailto:${contacts.acf.email}"`}>{contacts.acf.email}</a></p>
					</div>
					<div className="cont_item">
						<p className="green_light uppercase yMapBottom">Схема проезда</p>
						<YandexMap contacts={contacts} />	
					</div>
					<div className="cont_item yMapTop">
						<p className="green_light uppercase">Задайте Ваш вопрос:</p>
						<ContactForm onSubmit={this.submit}/>
					</div>
				</div>
			</section>
		)
	}

	submit = (values) => {
		console.log("submit props: ", this.props)
		this.props.sendForm(values)
	}
}

const mapStateToProps = state => {
	return {
		contacts: state.contacts.entities,
		loading: state.contacts.loading,
		error: state.contacts.error
	}
}
export default connect(mapStateToProps, {sendForm})(Contacts)
