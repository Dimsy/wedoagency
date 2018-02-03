import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loader from '../Loader'
import ErrorCmp from '../ErrorCmp'
import {loadFullAssortiment} from '../../ducks/fullAssortiment'
import renderHTML from 'react-render-html'
import {FULLASSORTIMENT} from '../../config'

class Assortment extends Component{
	componentDidMount(){
		this.props.loadFullAssortiment(FULLASSORTIMENT)
	}

	render(){
		const {fullAssortiment, error, loading} = this.props

		if (loading) return (<section className="info"><Loader /></section>)
		if (error) return (<section className="info"><ErrorCmp error={error} /></section>)	


		return(
			<section className="info">
				<h1 className="dark">полный ассортимент<br />пищевых ароматизаторов</h1>
				<div className="fullAssortiment">
				{renderHTML(fullAssortiment.data.content.rendered)}
				</div>
			</section>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		fullAssortiment: state.fullAssortiment.entities,
		error: state.fullAssortiment.error,
		loading: state.fullAssortiment.loading
	}
}

export default connect(mapStateToProps, {loadFullAssortiment})(Assortment) 