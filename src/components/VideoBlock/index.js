import React from 'react'

export default function VideoBlock(props){

	return (
		<div className="row no-gutters">
			<div className="col">		
				<div className={`embed-responsive embed-responsive-16by9 ${props.class}`}>
					<iframe src={ `https://player.vimeo.com/video/${props.video}` } 
									frameBorder="0" 
									allowFullScreen 
									className="embed-responsive-item" 
					/>
				</div>
			</div>	
		</div>
	)
}