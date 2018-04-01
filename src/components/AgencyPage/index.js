import React, {Component} from 'react';
import { connect } from 'react-redux'
import { loadAgencyPage } from '../../ducks/agencyPage';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import renderHTML from 'react-render-html'


class AgencyPage extends Component {
	
	componentDidMount(){
		const { useLang, loadAgencyPage } = this.props
		loadAgencyPage(useLang)
	}

	componentWillReceiveProps(nextProps){
		if(this.props.useLang != nextProps.useLang){
			this.props.loadAgencyPage(nextProps.useLang);
		}
	}

	render(){
		const {match, entities, useLang, loading, error} = this.props
		
		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);	

		const header = {
			backgroundImage: `-webkit-image-set( url(${entities.acf.foto}) 1x, url(${entities.acf.Fotox2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${entities.acf.foto}) 1x, url(${entities.acf.Fotox2}) 2x )`,
			backgroundImage: `-o-image-set( url(${entities.acf.foto}) 1x, url(${entities.acf.Fotox2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${entities.acf.foto}) 1x, url(${entities.acf.Fotox2}) 2x )`,
			backgroundImage: `url(${entities.acf.foto})`
		};

		

		console.log("--",entities.acf.videoHeader)

		const headerBlock = (window.innerWidth > 768 || entities.acf.videoHeader) ?	<div className="headerImgBlock" style={{overflow: 'hidden'}}>
																																										<video id="video_bg" autoPlay="autoplay" loop="loop" >
																																											<source src={entities.acf.videoHeader.url} type="video/mp4"></source>
																																										</video>
																																									</div>
																																								: <div className="articleImgNews" style={header} />


    const videoBlock = entities.acf.video ? <div className="row no-gutters">
																									<div className="col">		
																										<div className="embed-responsive embed-responsive-16by9 agencyVideo">
																	 										<iframe src={ `https://player.vimeo.com/video/${entities.acf.video}` } 
																	 														frameBorder="0" 
																	 														allowFullScreen 
																	 														className="embed-responsive-item" 
																	 										/>
																	 									</div>
																	 								</div>	
														 										</div>
														 									: null
		
		return (
			<div className="articlePage">
				{headerBlock}
				<div className="container">
	 				<div className="row no-gutters">
	 					<div className="col-md-6 agencyPage__collage">
	 						<img src={`${entities.acf.collage}`} />
	 					</div>
	 					
	 					<div className="col-md-5 agencyInfo">
	 						<h1>
	 							{entities.title.rendered}
	 						</h1>
	 						{ renderHTML(entities.content.rendered)}
	 						<div className="sign">
	 							{entities.acf.sign}
	 						</div>
	 					</div>
	 				</div>
	 				{videoBlock}
	 			</div>
 			</div>
		)
	}	
}

const mapStateToProps = state => {
	return{
		useLang: state.lang.useLang,
		entities: state.AgencyPage.entities,
		loading: state.AgencyPage.loading,
		error: state.AgencyPage.error
	}
}
	
export default connect(mapStateToProps, { loadAgencyPage })(AgencyPage)