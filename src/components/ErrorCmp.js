import React from 'react'

function ErrorCmp(props){

	return (
		<h5 className="handler error">Ошибка загрузки: {props.error.response.statusText}</h5>
	)
}

export default ErrorCmp