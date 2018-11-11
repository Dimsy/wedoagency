import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import { Grid, Row, Col } from 'react-bootstrap';
import renderHTML from 'react-render-html'
import safeEval from 'safe-eval'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import VideoHeader from './VideoHeader'
import $ from "jquery";
import {loadPortfolioItem} from "../../ducks/portfolioItem";
import {Helmet} from "react-helmet";

class PortfolioPage extends Component{

	componentWillMount() {
		const id = window.location.href.split('/').pop();

        this.props.loadPortfolioItem(id);

        $.fn.visible = function(partial) {

            var $t            = $(this),
                $w            = $(window),
                viewTop       = $w.scrollTop(),
                viewBottom    = viewTop + $w.height(),
                _top          = $t.offset().top,
                _bottom       = _top + $t.height(),
                compareTop    = partial === true ? _bottom : _top,
                compareBottom = partial === true ? _top : _bottom;

            return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

        };

        $(window).scroll(function(event) {
			console.log('upd')
            $(".iBlock img").each(function(i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    el.addClass("come-in");
                }
            });

        });
	}

	componentWillUpdate() {
        var win = $(window);
        var allMods = $(".module");

// Already visible modules
        allMods.each(function(i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass("already-visible");
            }
        });

        win.scroll(function(event) {

            allMods.each(function(i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    el.addClass("come-in");
                }
            });

        });
	}

	a = (photos) => {
		for (let key in photos){		
			const photoIndex = key.indexOf('photo')

			const photo = key.substring(photoIndex)
			photos[photo] = photos[key]
		}

		if (!photos.photo1 || !photos.photo1x2 || !photos.photo2 || !photos.photo2x2|| !photos.photo3 || !photos.photo3x2) return null

		return (
			<Row key={photos.photo1+'_'+photos.photo1x+Date.now()} className="no-gutters">
				<div className="col-6 blockA blockA_one iBlock">
					<img src={`${photos.photo1}`}  srcSet={`${photos.photo1x2} 2x`} alt="Фото проекта 1" />
				</div>
				<div className="col-6 blockA blockA_two iBlock">
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
				<div className="col-6 blockB blockB_two iBlock">
					<img src={`${photos.photo2}`}  srcSet={`${photos.photo2x2} 2x`} alt="Фото проекта" />
					<img src={`${photos.photo3}`}  srcSet={`${photos.photo3x2} 2x`} alt="Фото проекта" />
				</div>
				<div className="col-6 blockB blockB_one iBlock">
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
				<div className="col-12 blockC iBlock">
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
				<div className="col-12 blockD iBlock">
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
				<div className="col-6 blockE iBlock">
					<img src={`${photos.photo1}`}  srcSet={`${photos.photo1x2} 2x`} alt="Фото проекта" style={styleLeft}/>
                    <img src={`${photos.photo3}`}  srcSet={`${photos.photo3x2} 2x`} alt="Фото проекта" style={styleLeft}/>
				</div>
                <div className="col-6 blockE iBlock blockE_dropM">
                    <img src={`${photos.photo2}`}  srcSet={`${photos.photo2x2} 2x`} alt="Фото проекта" style={styleLeft}/>
                    <img src={`${photos.photo4}`}  srcSet={`${photos.photo4x2} 2x`} alt="Фото проекта" style={styleLeft}/>
                </div>
                <div className="clear" />
			</Row>
		)	
	}

	render(){
		const { useLang, entities, loading, error, match, selectedPortfolio} = this.props;
		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);

		if (selectedPortfolio) console.log(selectedPortfolio);


		const project = selectedPortfolio

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
		//headerPhotoMobile
		const headerPC = {
			backgroundImage: `-webkit-image-set( url(${project.acf.headerPhoto}) 1x, url(${project.acf.headerPhotox2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${project.acf.headerPhoto}) 1x, url(${project.acf.headerPhotox2}) 2x )`,
			backgroundImage: `-o-image-set( url(${project.acf.headerPhoto}) 1x, url(${project.acf.headerPhotox2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${project.acf.headerPhoto}) 1x, url(${project.acf.headerPhotox2}) 2x )`,
			backgroundImage: `url(${project.acf.headerPhoto})`,
		};

        const headerMobile = {
            backgroundImage: `-webkit-image-set( url(${project.acf.headerPhotoMobile}) 1x, url(${project.acf.headerPhotoMobilex2}) 2x )`,
            backgroundImage: `-moz-image-set( url(${project.acf.headerPhotoMobile}) 1x, url(${project.acf.headerPhotoMobilex2}) 2x )`,
            backgroundImage: `-o-image-set( url(${project.acf.headerPhotoMobile}) 1x, url(${project.acf.headerPhotoMobilex2}) 2x )`,
            backgroundImage: `-ms-image-set( url(${project.acf.headerPhotoMobile}) 1x, url(${project.acf.headerPhotoMobilex2}) 2x )`,
            backgroundImage: `url(${project.acf.headerPhotoMobile})`,
        };

		const headerBlock = window.innerWidth < 768 ? <div className="articleImgNews" style={headerMobile} />
			: project.acf.headerVideo
				? <VideoHeader src={project.acf.headerVideo} key={project.acf.headerVideo} />
				: <div className="articleImgNews" style={headerPC} />

		//const headerBlock = (window.innerWidth < 768 || !project.acf.headerVideo) ? <div className="articleImgNews" style={header} />: <VideoHeader src={project.acf.headerVideo} key={project.acf.headerVideo} />

		const title = useLang == 'ru' ? project.title.rendered : project.acf.titleEn;
																																																																										
		const contentText = useLang == 'ru' ? project.content.rendered : project.acf.textEn;


		const content = project.content.rendered.length != 0 ?  <div className="content">
																															<div dangerouslySetInnerHTML={{ __html: contentText }} />
																													  </div> 
																												 : null

		const photoNextText = (!!project.acf.photoNextText) && (project.acf.photoNextText != false)
		 											? <img src={`${project.acf.photoNextText}`}
		 														 srcSet={`${project.acf.photoNextTextx2} 2x`}
		 														 alt="Фото проекта"
		 														 className="portfolioTitlePhoto" />
		 											: null							

		
		const videoPortfolio = `https://player.vimeo.com/video/${project.acf.video}`

		const videoBody = project.acf.video.length > 0 ? <div className="row no-gutters">
																											 <div className="col-sm-12 embed-responsive embed-responsive-16by9 showVideo">
																											   <iframe src={videoPortfolio} 
																												 				 frameBorder="0" 
																																 allowFullScreen className="embed-responsive-item" 
																																 style={{paddingLeft: "15px", paddingRight: "15px"}}/>
																										     </div>

																										 </div>
																									: <div style={{marginBottom: '90px'}} />;

		const photographers_list = project.acf.photographers_list ? project.acf.photographers_list.split(/\n/) : [];
		const videographs_list = project.acf.videograph_list ? project.acf.videograph_list.split(/\n/) : [];

		console.log(photographers_list);
        console.log(videographs_list);

        const photographers_el = photographers_list.map(
        	(item) =>
				<div className="row">
					<b key={item} className="col-md-12" >{item}</b>
				</div>
			);

        const videographs_el = videographs_list.map(
            (item) =>
                <div className="row">
                    <b key={item} className="col-md-12" >{item}</b>
                </div>
        );

		const photovideoElement =	<div className="row" >
										<div className="col-md-3" >
											Фотограф:&nbsp;
										</div>
										<div className="col-md-3" >
											{photographers_el}
										</div>
										<div className="col-md-3" >
											Видеограф:&nbsp;
										</div>
										<div className="col-md-3" >
											{videographs_el}
										</div>
									</div>;

		return(
			<div className="portfolioPage__project">
				<Helmet>
					<title>WeDoAgency | {title}</title>
				</Helmet>
				<ReactCSSTransitionGroup transitionName="anim"
																 transitionAppear={true}
																 transitionAppearTimeout={2000}
																 transitionEnter={false}
																 transitionLeave={false}>
					{headerBlock}
					<div className="container portfolioPage__container-padding">
                        {photovideoElement}
						<Row className="no-gutters">
							<div className="col-md-4" >
								<h1 className="portfolio__title">
									{title}
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
		error: state.portfolio.error,
        selectedPortfolio: state.portfolioItem.selectedPortfolio
	}
}

export default connect(mapStateToProps, {loadPortfolioItem})(PortfolioPage);
