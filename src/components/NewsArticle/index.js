import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import { loadNewsArticleList } from '../../ducks/newsArticle';
import {Link} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import $ from "jquery";
import {Helmet} from "react-helmet";


class NewsArticle extends Component{
	
	componentDidMount(){
        const id = window.location.href.split('/').pop();

        this.props.loadNewsArticleList(!id ? this.props.location.pathname.split('/')[2] : this.props.location.pathname, !id);
	}

	foto = (data, key) => {
		const ftx2 = data['ftx2' + key.substring(4)] || data[key]

		if( !data[key] ) return null

		return ( 
							<div className="row no-gutters" key={key}>
								<div className="col-md-12">
									<img src={data[key]} srcSet={ `${ftx2} 2x`} className="newsBodyImg"/> 
								</div>
							</div>
					)		
	}

	slog = (key, item) => {

		if(!item) return null
		return (
						<div className="row no-gutters" key={key}>
							<div className="col-md-6 offset-md-3">		
								<div className="articleContent">
									<h2>
										
										<div dangerouslySetInnerHTML={{ __html: item }} />
									</h2>
								</div>
							</div>
						</div>
					)
	}

	text = (key, item) => {
		const { useLang } = this.props;


		if(!item) return null

		if (useLang == "ru" && key.indexOf('En') !== -1) return null;
        if (useLang == "en" && (key.indexOf('En') === -1 || key === 'textEn')) return null;

        item = item.split('a href').join('a target="_blank" href');

		return (
						<div className="row no-gutters" key={key}>
							<div className="col-md-8  offset-md-2">		
								<div className="articleContent afterImg">
									<div dangerouslySetInnerHTML={{ __html: item }} />
								</div>
							</div>
						</div>
					)
	}

	sortBody = (a, b) => {
		const el1 = a.key
		const el2 = b.key

		if (el1.substring(4) > el2.substring(4)) {
			return 1
		}  else if (el1.substring(4) > el2.substring(4)) {
			return -1
		} else {
			return 0
		}
	}

	render(){
		const {match, entities, useLang, loading, error} = this.props
		
		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);	


		if (!entities && !entities.length) {
  		return <div>Данные временно не доступны</div>			
		}

        const article = entities[0];
		const i18 = useLang == "ru" ? "ru" : "en-US";
		const allNews = useLang == "ru" ? "Все новости" : "all news";

		const date =  new Date(article.date);

		const options = {
		  day: 'numeric',
		  month: 'long',
		  year: 'numeric'
		};

        const headerPC = {
            backgroundImage: `-webkit-image-set( url(${article.acf.headImgNews}) 1x, url(${article.acf.headImgNewsx2}) 2x )`,
            backgroundImage: `-moz-image-set( url(${article.acf.headImgNews}) 1x, url(${article.acf.headImgNewsx2}) 2x )`,
            backgroundImage: `-o-image-set( url(${article.acf.headImgNews}) 1x, url(${article.acf.headImgNewsx2}) 2x )`,
            backgroundImage: `-ms-image-set( url(${article.acf.headImgNews}) 1x, url(${article.acf.headImgNewsx2}) 2x )`,
            backgroundImage: `url(${article.acf.headImgNews})`
        };

        const headerMobile = {
            backgroundImage: `-webkit-image-set( url(${article.acf.headerPhotoMobile}) 1x, url(${article.acf.headerPhotoMobilex2}) 2x )`,
            backgroundImage: `-moz-image-set( url(${article.acf.headerPhotoMobile}) 1x, url(${article.acf.headerPhotoMobilex2}) 2x )`,
            backgroundImage: `-o-image-set( url(${article.acf.headerPhotoMobile}) 1x, url(${article.acf.headerPhotoMobilex2}) 2x )`,
            backgroundImage: `-ms-image-set( url(${article.acf.headerPhotoMobile}) 1x, url(${article.acf.headerPhotoMobilex2}) 2x )`,
            backgroundImage: `url(${article.acf.headerPhotoMobile})`
        };

        /*
		const body = []

		for( const key in entities.acf){
			switch(key.substring(0, 4)){
				case 'foto':
				 	body.push(this.foto(entities.acf, key))
				 	break;

				case 'slog':
					body.push(this.slog(key, entities.acf[key]))
					break;

				case 'text':
					body.push(this.text(key, entities.acf[key]))
			}
		}
        */
		const videoBlock = article.acf.videoNews ? <div className="row no-gutters">
																									<div className="col">		
																										<div className="embed-responsive embed-responsive-16by9 newsArticleVideo">
																	 										<iframe src={ `https://player.vimeo.com/video/${article.acf.videoNews}` }
																	 														frameBorder="0" 
																	 														allowFullScreen 
																	 														className="embed-responsive-item" 
																	 										/>
																	 									</div>
																	 								</div>	
														 										</div>
														 									: null

		return (
			<div className="newsArticleBlock">
				<Helmet>
					<title>WeDoAgency | {useLang === 'ru' ? article.title.rendered : article.acf.titleEn}</title>
				</Helmet>
				<ReactCSSTransitionGroup transitionName="anim" 
																 transitionAppear={true} 
																 transitionAppearTimeout={2000}
																 transitionEnter={false} 
																 transitionLeave={false}>
					<div className="articleImgNews" style={window.innerWidth < 768 ? headerMobile : headerPC} />
					<div className="articleDate">
						{date.toLocaleString( i18, options)}
					</div>
					<div>
						<div className="container" id="container">
							<div className="row no-gutters">
								<div className="col-md-8 offset-md-2">
									<div className="articleTitle">			
										{useLang === 'ru' ? article.title.rendered : article.acf.titleEn}
									</div>			
									<div className="articleContent">
										<div dangerouslySetInnerHTML={{ __html: useLang === 'ru' ? article.content.rendered : article.acf.textEn }} />
									</div>
								</div>
							</div>
						
							<div className="row no-gutters">
								<div className="col-md-12">
									<img src={article.acf.bodyImgNews} srcSet={ `${article.acf.bodyImgNewsx2} 2x`} className="newsBodyImg"/> 
								</div>
							</div>
                                { this.text(useLang === 'ru' ? 'text1' : 'text1En', article.acf[useLang === 'ru' ? 'text1' : 'text1En']) }
                                { this.slog(useLang === 'ru' ? 'slog1' : 'slog1En', article.acf[useLang === 'ru' ? 'slog1' : 'slog1En']) }
                                { this.foto(article.acf, 'foto1') }
                                { this.text(useLang === 'ru' ? 'text2' : 'text2En', article.acf[useLang === 'ru' ? 'text2' : 'text2En']) }
                                { this.slog(useLang === 'ru' ? 'slog2' : 'slog2En', article.acf[useLang === 'ru' ? 'slog2' : 'slog2En']) }
                                { this.foto(article.acf, 'foto2') }
                                { this.text(useLang === 'ru' ? 'text3' : 'text3En', article.acf[useLang === 'ru' ? 'text3' : 'text3En']) }
                                { this.slog(useLang === 'ru' ? 'slog3' : 'slog3En', article.acf[useLang === 'ru' ? 'slog3' : 'slog3En']) }
								{videoBlock}
							<div className="row no-gutters">
								<div className="col">		
									<Link to='/news' className="linkToAllNews">
										{ allNews }
									</Link>
								</div>
							</div>
						</div>
					</div>
				</ReactCSSTransitionGroup>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
		useLang: state.lang.useLang,
		entities: state.newsArticle.entities,
		loading: state.newsArticle.loading,
		error: state.newsArticle.error
	}
}
export default connect(mapStateToProps, { loadNewsArticleList })(NewsArticle);