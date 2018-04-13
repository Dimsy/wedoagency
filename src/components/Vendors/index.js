import React, {Component} from 'react'
import { connect } from 'react-redux'
import Loader from '../Loader'
import {VENDORS} from '../../config'
import ErrorCmp from '../ErrorCmp'
import scrollToElement from 'scroll-to-element'
import renderHTML from 'react-render-html'
import {loadVendors} from '../../ducks/vendors'

class Vendors extends Component {

	componentDidMount(){
		this.props.loadVendors(VENDORS)
		var elem = document.querySelector('body')
		scrollToElement(elem)
	}

	render(){
		const {vendors, error, loading} = this.props

		if (loading) return (<section className="info"><Loader /></section>)
		if (error) return (<section className="info"><ErrorCmp error={error} /></section>)	

		return (
			<section className="info">
				<h1 className="dark">Производители</h1>
				<div className="vendors">
				{renderHTML(vendors.data.content.rendered)}
				</div>
			</section>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		vendors: state.vendors.entities,
		error: state.vendors.error,
		loading: state.vendors.loading
	}
}
export default connect(mapStateToProps, {loadVendors})(Vendors)