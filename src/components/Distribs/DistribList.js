import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loader from '../Loader'
import renderHTML from 'react-render-html'
import ErrorCmp from '../ErrorCmp'
import DistribListItem from './DistribListItem'

class DistribList extends Component{
	render(){
		const {distribs} = this.props
 
		const body = distribs.map( item =>
																	<li key={item.id} className="distribAddr">
																		<DistribListItem item={item} />
																	</li>)
																	

		return(
			<ul className="distrList">
				{body}
				<div className="clear"> </div>
			</ul>
		)
	}
}

const mapStateToProps = state => {
	return {
		distribs: state.distribs.entities.sortBy(item => item.id),
		loading: state.distribs.loading,
		error: state.distribs.error
	}
}

export default connect(mapStateToProps)(DistribList)