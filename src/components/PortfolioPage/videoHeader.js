import React, {Component} from 'react';

class VideoHeader extends Component{

	render(){

		const {src} = this.props

		return (
			<div className="headerImgBlock" style={{overflow: 'hidden', marginBottom: '100px'}}>
				<video id="video_bg" autoPlay="autoplay" loop="loop" preload="metadata">
					<source src={src} type="video/mp4" />
				</video>
			</div>
		)
	}
}

export default VideoHeader