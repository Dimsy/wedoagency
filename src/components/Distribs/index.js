import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loader from '../Loader'
import renderHTML from 'react-render-html'
import ErrorCmp from '../ErrorCmp'
import DistribItem from './DistribItem'
import DistribList from './DistribList'
import DistribItemInfo from './DistribItemInfo'
import {loadDistribs} from '../../ducks/distribs'
import { DISTRIBS } from '../../config'

class Distribs extends Component{
	
	componentDidMount(){
		this.props.loadDistribs(DISTRIBS)
	}

	state = {
		openDistribId: null
	}

	render(){
		const {distribs, loading, error, contacts} = this.props

		if (loading) return (<section className="about"><div className="white"><Loader /></div></section>)
		if (error) return (<section className="about"><ErrorCmp error={error} /></section>)	

		const body =  distribs.map(item => 
																<li key={item.id} className={`distr ${item.slug}`}>
																	<DistribItem 
																		item={item} 
																		toggleOpenDistrib = {this.toggleOpenDistrib(item.id)}
																	/>
																</li>) 
																	
		const bodyInfo =  distribs.map(item => 
																		<li key={item.id} className={`distr ${item.slug}`}>
																			<DistribItemInfo
																				item={item} 
																				isOpen={item.id === this.state.openDistribId}																												
																				closeDistrib = {this.closeDistrib()}
																			/>
																		</li>) 
																	
 
		return(
			<section className="info">
				<h1 className="dark">ДИСТРИБЬЮТОРЫ</h1>
				<ul className="distrMap">
					{body}
					{bodyInfo}
				</ul>
				<DistribList />
			</section>
		)

	}
	
	toggleOpenDistrib = openDistribId => ev => {
		this.setState({
		 	openDistribId
		})
	}

	closeDistrib = () => ev => {
		this.setState({
			openDistribId: null
		})
	}

}

const mapStateToProps = state => {
	return {
		contacts: state.contacts.entities,
		distribs: state.distribs.entities,
		loading: state.distribs.loading,
		error: state.distribs.error
	}
}

export default connect(mapStateToProps, {loadDistribs})(Distribs)