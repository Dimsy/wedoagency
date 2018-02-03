import React, {Component} from 'react'

function RenderedField(props){
	
	const {input, textarea, label, type, placeholder, meta: {touched, error, warning}} = props
	
	const body = input.name !== "message" ? <input {...input} placeholder={placeholder} type={type} /> 
																		 		:	<textarea {...input} placeholder={placeholder} type={type} /> 


	// console.log("input: ", input.value)

	return(
		<div>
			<label>{label}:</label>
			<div>
				{body}<br />
				{touched && ((error && <span className="error formError">{error}</span>) || (warning && <span>{warning}</span>))}
			</div>
		</div>
	)
	
}

export default RenderedField