import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loader from '../Loader'
import renderHTML from 'react-render-html'
import ErrorCmp from '../ErrorCmp'

class DistribListItem extends Component{
	render(){
		const {item} = this.props

		const addr = item.acf.fullAddr ? <p>{item.acf.fullAddr}</p> : null
		const phone1 = <p>тел.: {item.acf.phone1}</p>
		const phone2 = item.acf.phone2 ? <p>тел.: {item.acf.phone2}</p> : null
		const phone3 = item.acf.phone3 ? <p>тел.: {item.acf.phone3}</p> : null
		const email = item.acf.email ? <p>email: <a href={`mailto:${item.acf.email}`}>{item.acf.email}</a></p> : null
 
		const body = (<div >
										<div className="dark" >
											<b>{renderHTML(item.content.rendered)}, {renderHTML(item.title.rendered) }</b>
										</div>
										{addr}
										{phone1}
										{phone2}
										{phone3}
										{email}
									</div>
									)
																						

		return(
			<div>
				{body}
			</div>
		)
	}
}

export default DistribListItem