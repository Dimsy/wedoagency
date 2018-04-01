import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import { Grid, Row, Col } from 'react-bootstrap';
import renderHTML from 'react-render-html'
import safeEval from 'safe-eval'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class PortfolioPage extends Component{

	a = (photos) => {
		for (let key in photos){		
			const photoIndex = key.indexOf('photo')

			const photo = key.substring(photoIndex)
			photos[photo] = photos[key]
		}

		if (!photos.photo1 || !photos.photo1x2 || !photos.photo2 || !photos.photo2x2|| !photos.photo3 || !photos.photo3x2) return null

		return (
			<Row key={photos.photo1+'_'+photos.photo1x+Date.now()} className="no-gutters">
				<div className="col-6 blockA blockA_one">
					<img src={`${photos.photo1}`}  srcSet={`${photos.photo1x2} 2x`} alt="Фото проекта 1" />
				</div>
				<div className="col-6 blockA blockA_two">
					<img src={`${photos.photo2}`}  srcSet={`${photos.photo2x2} 2x`} alt="Фото проекта 2" />
					<img src={`${photos.photo3}`}  srcSet={`${photos.photo3x2} 2x`} alt="Фото проекта 3" />
					<div className="clear"/>
				</div>
			</Row>
		)	
	}

	b = (photos) => {

		for (let key in photos){
			const photoIndex = key.indexOf('photo')

			const photo = key.substring(photoIndex)
			photos[photo] = photos[key]								 
		}
		
		if (!photos.photo1 || !photos.photo1x2 || !photos.photo2 || !photos.photo2x2|| !photos.photo3 || !photos.photo3x2) return null

		return (
			<Row key={photos.photo1+'_'+photos.photo1x2+Date.now()} className="no-gutters">
				<div className="col-6 blockB blockB_two">
					<img src={`${photos.photo2}`}  srcSet={`${photos.photo2x2} 2x`} alt="Фото проекта" />
					<img src={`${photos.photo3}`}  srcSet={`${photos.photo3x2} 2x`} alt="Фото проекта" />
				</div>
				<div className="col-6 blockB blockB_one">
					<img src={`${photos.photo1}`}  srcSet={`${photos.photo1x2} 2x`} alt="Фото проекта" />
					<div className="clear" />
				</div>
			</Row>
		)	
	}

	c = (photos) => {

		for (let key in photos){
			const photoIndex = key.indexOf('photo')

			const photo = key.substring(photoIndex)
			photos[photo] = photos[key]									 
		}
		
		if (!photos.photo1 || !photos.photo1x2 || !photos.photo2 || !photos.photo2x2|| !photos.photo3 || !photos.photo3x2) return null

		return (
			<Row key={photos.photo1+'_'+photos.photo1x2+Date.now()} className="no-gutters">
				<div className="col-12 blockC">
					<img src={`${photos.photo1}`}  srcSet={`${photos.photo1x2} 2x`} alt="Фото проекта"/>
					<img src={`${photos.photo2}`}  srcSet={`${photos.photo2x2} 2x`} alt="Фото проекта"/>
					<img src={`${photos.photo3}`}  srcSet={`${photos.photo3x2} 2x`} alt="Фото проекта"/>
				</div>
			</Row>
		)	
	}

	d = (photos) => {

		for (let key in photos){
			const photoIndex = key.indexOf('photo')

			const photo = key.substring(photoIndex)
			photos[photo] = photos[key]									 
		}

		if (!photos.photo1 || !photos.photo1x2 ) return null

		return (
			<Row key={photos.photo1+'_'+photos.photo1x2+Date.now()} className="no-gutters">
				<div className="col-12 blockD">
					<img src={`${photos.photo1}`}  srcSet={`${photos.photo1x2} 2x`} alt="Фото проекта"/>
				</div>
			</Row>
		)	
	}

	e = (photos) => {
		for (let key in photos){
			const photoIndex = key.indexOf('photo')
			const photo = key.substring(photoIndex)

			photos[photo] = photos[key]						 
		}


		const styleRight = {
						display: "inline-block", 
						float: "right"
					}

		const styleLeft = {
						display: "inline-block", 
						float: "left"
					}				
		
	  if (!photos.photo1 || !photos.photo1x2 || !photos.photo2 || !photos.photo2x2|| !photos.photo3 || !photos.photo3x2 || !photos.photo4 || !photos.photo4x2) return null

		return (
			<Row key={photos.photo1+'_'+photos.photo1x2+Date.now()} className="no-gutters">
				<div className="col-12 blockE">
					<img src={`${photos.photo1}`}  srcSet={`${photos.photo1x2} 2x`} alt="Фото проекта" style={styleLeft}/>
					<img src={`${photos.photo2}`}  srcSet={`${photos.photo2x2} 2x`} alt="Фото проекта" style={styleRight}/>
					<img src={`${photos.photo3}`}  srcSet={`${photos.photo3x2} 2x`} alt="Фото проекта" style={styleRight}/>
					<img src={`${photos.photo4}`}  srcSet={`${photos.photo4x2} 2x`} alt="Фото проекта" style={styleLeft}/>
					<div className="clear" />
				</div>
			</Row>
		)	
	}

	render(){
		const { useLang, entities, loading, error, match, portfolioList} = this.props;

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);	

		const portfolioSet = entities.toArray();

		if ( portfolioSet.length == 0){
			return <div>Данные пока не доступны!</div>
		}

		const portfolioItem = portfolioSet.filter(item => item.id == match.params.id)

		if ( portfolioItem.length == 0){
			return null
		}

		const project = portfolioItem[0].toJS()

		const body = []
		
		for (let key in project.acf){
			const photoBlock = project.acf[key]

			if (~key.indexOf("block") && (photoBlock == 'a' || 'b' || 'c' || 'd' || 'e')) {

				const photoBlockIndex = +project.acf[key].substring(1) 
				const photos = {}

	
				for (key in project.acf ){
					if( key.substring(2 ,key.indexOf("_")) == photoBlockIndex){
					
						photos[key] = project.acf[key]
					}
			
				}

				const createBlock = safeEval(photoBlock[0], this)
				body.push(createBlock(photos))		
		 	}
		}	

		const header = {
			backgroundImage: `-webkit-image-set( url(${project.acf.headerPhoto}) 1x, url(${project.acf.headerPhotox2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${project.acf.headerPhoto}) 1x, url(${project.acf.headerPhotox2}) 2x )`,
			backgroundImage: `-o-image-set( url(${project.acf.headerPhoto}) 1x, url(${project.acf.headerPhotox2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${project.acf.headerPhoto}) 1x, url(${project.acf.headerPhotox2}) 2x )`,
			backgroundImage: `url(${project.acf.headerPhoto})`,
			marginBottom: '100px'
		};

		const headerBlock = (window.innerWidth < 768 || !project.acf.headerVideo) ? <div className="articleImgNews" style={header} />
																																							 : <div className="headerImgBlock" style={{overflow: 'hidden', marginBottom: '100px'}}>
																																						    	<video id="video_bg" autoPlay="autoplay" loop="loop" >
																																						  			<source src={project.acf.headerVideo} type="video/mp4" />
																																						  		</video>
																																						  	</div>

		const content = project.content.rendered.length != 0 ?  <div className="content">
																															{renderHTML(project.content.rendered)}
																													  </div> 
																												 : null

		const photoNextText = (!!project.acf.photoNextText) && (project.acf.photoNextText != false)
		 											? <img src={`${project.acf.photoNextText}`}
		 														 srcSet={`${project.acf.photoNextTextx2} 2x`}
		 														 alt="Фото проекта"
		 														 className="portfolioTitlePhoto" />
		 											: null							

		
		const videoPortfolio = `https://player.vimeo.com/video/${project.acf.video}`

		const videoBody = project.acf.video.length > 0 ? <Row className="no-gutters">
																											 <div className="col-sm-12 embed-responsive embed-responsive-16by9 showVideo">
																											   <iframe src={videoPortfolio} 
																												 				 frameBorder="0" 
																																 allowFullScreen className="embed-responsive-item" 
																																 style={{paddingLeft: "15px", paddingRight: "15px"}}/>
																										     </div>
																										 </Row>
																									: <div style={{marginBottom: '90px'}} />
					
		return(
			<div className="portfolioPage__project">
				<ReactCSSTransitionGroup transitionName="anim" transitionAppear={true} transitionAppearTimeout={2000}
																 transitionEnter={false} transitionLeave={false}>
  
					{headerBlock}
					<div className="container portfolioPage__container-padding">
						
						<Row className="no-gutters">
							<div className="col-md-4" >
								<h1 className="portfolio__title">
									{project.title.rendered}
								</h1>	
								{content}
							</div>
							<div className="col-md-8 portfolioPage__photoNextText" >
								{photoNextText}
							</div>
						</Row>
						{body}
						{videoBody}
					</div>
				</ReactCSSTransitionGroup>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		useLang: state.lang.useLang,
		entities: state.portfolio.entities,
		portfolioList: state.portfolio.portfolioList,
		loading: state.portfolio.loading,
		error: state.portfolio.error
	}
}

export default connect(mapStateToProps)(PortfolioPage)
