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
		
		return (
			<Row key={photos.photo1+'_'+photos.photo1x2}>
				<Col md={12}>
					<img src={`${photos.photo1}`}  srcSet={`${photos.photo1x2} 2x`} alt="Фото проекта"/>
					<img src={`${photos.photo2}`}  srcSet={`${photos.photo2x2} 2x`} alt="Фото проекта"/>
					<img src={`${photos.photo3}`}  srcSet={`${photos.photo3x2} 2x`} alt="Фото проекта"/>
				</Col>
			</Row>
		)	
	}

	b = (photos) => {
		for (let key in photos){
			const photoIndex = key.indexOf('photo')

			const photo = key.substring(photoIndex)
			photos[photo] = photos[key]								 
		}

		const styleRight = {
						display: "inline-block", 
						float: "right"
					}
		
		return (
			<Row key={photos.photo1+'_'+photos.photo1x2}>
				<Col md={12}>
					<img src={`${photos.photo1}`}  srcSet={`${photos.photo1x2} 2x`} alt="Фото проекта" style={styleRight}/>
					<img src={`${photos.photo2}`}  srcSet={`${photos.photo2x2} 2x`} alt="Фото проекта" style={styleRight}/>
					<img src={`${photos.photo3}`}  srcSet={`${photos.photo3x2} 2x`} alt="Фото проекта" style={styleRight}/>
					<div className="clear" />
				</Col>
			</Row>
		)	
	}

	c = (photos) => {

		for (let key in photos){
			const photoIndex = key.indexOf('photo')

			const photo = key.substring(photoIndex)
			photos[photo] = photos[key]									 
		}
		
		return (
			<Row key={photos.photo1+'_'+photos.photo1x2}>
				<Col md={12}>
					<img src={`${photos.photo1}`}  srcSet={`${photos.photo1x2} 2x`} alt="Фото проекта"/>
					<img src={`${photos.photo2}`}  srcSet={`${photos.photo2x2} 2x`} alt="Фото проекта"/>
					<img src={`${photos.photo3}`}  srcSet={`${photos.photo3x2} 2x`} alt="Фото проекта"/>
				</Col>
			</Row>
		)	
	}

	d = (photos) => {

		for (let key in photos){
			const photoIndex = key.indexOf('photo')

			const photo = key.substring(photoIndex)
			photos[photo] = photos[key]									 
		}

		return (
			<Row key={photos.photo1+'_'+photos.photo1x2}>
				<Col md={12}>
					<img src={`${photos.photo1}`}  srcSet={`${photos.photo1x2} 2x`} alt="Фото проекта"/>
				</Col>
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
		
		return (
			<Row key={photos.photo1+'_'+photos.photo1x2}>
				<Col md={12}>
					<img src={`${photos.photo1}`}  srcSet={`${photos.photo1x2} 2x`} alt="Фото проекта" style={styleLeft}/>
					<img src={`${photos.photo2}`}  srcSet={`${photos.photo2x2} 2x`} alt="Фото проекта" style={styleRight}/>
					<img src={`${photos.photo3}`}  srcSet={`${photos.photo3x2} 2x`} alt="Фото проекта" style={styleRight}/>
					<img src={`${photos.photo4}`}  srcSet={`${photos.photo4x2} 2x`} alt="Фото проекта" style={styleLeft}/>
					<div className="clear" />
				</Col>
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
					if(~key.indexOf(`bl${photoBlockIndex}`)){
						
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

		const content = project.content.rendered.length != 0 ?  <div className="content">
																															<h1>
																																{project.title.rendered}
																															</h1>	
																															{renderHTML(project.content.rendered)}
																													  </div> 
																												 : null

		const photoNextText = (!!project.acf.photoNextText) && (project.acf.photoNextText != false)
		 											? <img src={`${project.acf.photoNextText}`}  srcSet={`${project.acf.photoNextTextx2} 2x`} alt="Фото проекта 1"/>
		 											: null							



		// console.log('-----',  (project.acf.video.length > 0))

		
		const videoBody = project.acf.video.length > 0 ? <iframe src={project.acf.video} width="960" height="540" 
																															frameBorder="0" allowFullScreen className="showVideo" />
																									 : <div style={{marginBottom: '90px'}} />
																					 

		return(
			<div className="portfolioPage__project">
				<ReactCSSTransitionGroup transitionName="anim" transitionAppear={true} transitionAppearTimeout={2000}
																 transitionEnter={false} transitionLeave={false}>
  
					<div className="articleImgNews" style={header} />
					<Grid>
						<Row>
							<Col md={12}>
								{content}
								{photoNextText}
								<div className="clear" />
							</Col>
						</Row>
						<Row>
							<Col md={12} className="photoBlock">
								{body}
							</Col>
						</Row>
						<Row>
							<Col md={12}>
								{videoBody}
							</Col>
						</Row>
					</Grid>
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