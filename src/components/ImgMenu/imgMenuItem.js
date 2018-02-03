import React, {component} from 'react'
import {Link} from 'react-router-dom'

function ImgMenuItem(props){
	const {item} = props

	const body = <Link to={`/catalogue${item.url}`} className={item.classes}><hr /><div><p>{item.title}</p></div></Link>

	return(
		<div>{body}</div>
	)
}

export default ImgMenuItem