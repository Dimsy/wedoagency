import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loader from '../Loader'
import ErrorCmp from '../ErrorCmp'
import renderHTML from 'react-render-html'

class Footer extends Component{
	render(){

		const {contacts, loading, error} = this.props

		if (loading ) return <Loader />
		if (error) return <ErrorCmp error={error} />		

		return(
			<section className="footer">
				<h1 className="white">Контакты</h1>
				<div className="contacts">
		 			<div className="contLogo"></div>
		 				<div className="contPhone">
		 					<i className="fa fa-phone green"></i>
		 					<p className="white">{contacts.acf.phone1}</p>
		 				</div>
		 			<div className="contAddr">
		 				<i className="fa fa-map-marker green"></i>
		 				<p className="white">	
		 					{renderHTML(contacts.content.rendered)}
		 					<br />
		 					{renderHTML(contacts.acf.fullAddr)}
		 				</p>
		 			</div>
		 			<div className="contPhone white">
		 				<i className="fa fa-envelope green"></i>
		 				<p className="white">{contacts.acf.email}</p>
		 			</div>
		 		</div>
			</section>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		contacts: state.contacts.entities,
		loading: state.contacts.loading,
		error: state.contacts.error
	}
}

export default connect(mapStateToProps)(Footer)