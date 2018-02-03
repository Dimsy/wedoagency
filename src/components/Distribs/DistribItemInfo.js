import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loader from '../Loader'
import renderHTML from 'react-render-html'
import ErrorCmp from '../ErrorCmp'

class DistribItemInfo extends Component{
	render(){
		const {item, isOpen,	closeDistrib} = this.props
			
		const phone1 = <p>тел.: {item.acf.phone1}</p>
		const phone2 = item.acf.phone2 ? <p>тел.: {item.acf.phone2}</p> : null
		const phone3 = item.acf.phone3 ? <p>тел.: {item.acf.phone3}</p> : null
		const email = item.acf.email ? <p>email: <a href={`${item.acf.email}`}>{item.acf.email}</a></p> : null

		const body = isOpen ? ( <div className="distr_info">
															<div className="distr_info_border">
																<div className="close" onClick={closeDistrib}></div>
																<div className="h6">
																	{renderHTML(item.content.rendered)}
																	<br />
																	{renderHTML(item.title.rendered) }
																</div>
																<div className="clear"></div>
																{phone1}
																{phone2}
																{phone3}
																{email}
															</div>
														</div>
													)
												: null											

		return(
			<div>
				{body}
			</div>
		)
	}
}

export default DistribItemInfo