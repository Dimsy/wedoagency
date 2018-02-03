import React from 'react'

function Error(props){
	return (
		<h5 className="handler error">Error: {props.error.statusText}</h5>
	)
}

export default Error