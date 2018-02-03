import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loader from '../Loader'
import renderHTML from 'react-render-html'
import ErrorCmp from '../ErrorCmp'
import {loadDistribs} from '../../AC'

class DistribItem extends Component{
	render(){
		const {item, toggleOpenDistrib} = this.props

		return(
			<div>
				<div className="mark" onClick={toggleOpenDistrib}>
					{renderHTML(item.title.rendered) }
				</div>
			</div>
		)
	}
}

export default DistribItem