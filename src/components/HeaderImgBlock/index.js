import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class HeaderImgBlock extends Component{

	render(){

		const {entities, loading, error} = this.props;

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);
		
		const photo = {
   		backgroundImage: `-webkit-image-set( url(${entities.acf.photo}) 1x, url(${entities.acf.photox2}) 2x )`,
   		backgroundImage: `-moz-image-set( url(${entities.acf.photo}) 1x, url(${entities.acf.photox2}) 2x )`,
   		backgroundImage: `-o-image-set( url(${entities.acf.photo}) 1x, url(${entities.acf.photox2}) 2x )`,
   		backgroundImage: `-ms-image-set( url(${entities.acf.photo}) 1x, url(${entities.acf.photox2}) 2x )`,
   		backgroundImage: `url(${entities.acf.photo})`
   	};

		

		if (window.innerWidth < 768 || !entities.acf.video) return <div className="headerImgBlock" style={photo}/>
		
		return (
			<div className="headerImgBlock" style={{overflow: 'hidden'}}>
				<ReactCSSTransitionGroup transitionName="anim" 
																 transitionAppear={true} 
																 transitionAppearTimeout={2000}
																 transitionEnter={false} 
																 transitionLeave={false}>
					<video id="video_bg" autoPlay="autoplay" loop="loop" >
						<source src={entities.acf.video} type="video/mp4"></source>
					</video>
				</ReactCSSTransitionGroup>	
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		entities: state.header.entities,
		loading: state.header.loading,
		error: state.header.error
	}
}

export default connect(mapStateToProps)(HeaderImgBlock)