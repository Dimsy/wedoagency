import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import { loadNewsArticleList } from '../../ducks/newsArticle';
import renderHTML from 'react-render-html'
import {Link} from 'react-router-dom';

class NewsArticle extends Component{
	
	componentDidMount(){
		const { match } = this.props
		this.props.loadNewsArticleList(match.params.id)
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
		if(!item) return null

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
	
		const article = entities;

		if (!article) {
  		return <div>Данные временно не доступны</div>			
		}

		const i18 = useLang == "ru" ? "ru" : "en-US";
		const allNews = useLang == "ru" ? "Все новости" : "all news";

		const date =  new Date(article.date);

		const options = {
		  day: 'numeric',
		  month: 'long',
		  year: 'numeric'
		};

		const divStyle = {
			backgroundImage: `-webkit-image-set( url(${article.acf.headImgNews}) 1x, url(${article.acf.headImgNewsx2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${article.acf.headImgNews}) 1x, url(${article.acf.headImgNewsx2}) 2x )`,
			backgroundImage: `-o-image-set( url(${article.acf.headImgNews}) 1x, url(${article.acf.headImgNewsx2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${article.acf.headImgNews}) 1x, url(${article.acf.headImgNewsx2}) 2x )`,
			backgroundImage: `url(${article.acf.headImgNews})`
		};

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
		

		const videoBlock = entities.acf.videoNews ? <div className="row no-gutters">
																									<div className="col">		
																										<div className="embed-responsive embed-responsive-16by9 newsArticleVideo">
																	 										<iframe src={ `https://player.vimeo.com/video/${entities.acf.videoNews}` } 
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
				<div className="articleImgNews" style={divStyle} />
				<div className="articleDate">
					{date.toLocaleString( i18, options)}
				</div>
				<div>
					<div className="container">
						<div className="row no-gutters">
							<div className="col-md-8 offset-md-2">
								<div className="articleTitle">			
									{article.title.rendered}
								</div>			
								<div className="articleContent">
									<div dangerouslySetInnerHTML={{ __html: article.content.rendered }} />
								</div>
							</div>
						</div>
					
						<div className="row no-gutters">
							<div className="col-md-12">
								<img src={article.acf.bodyImgNews} srcSet={ `${article.acf.bodyImgNewsx2} 2x`} className="newsBodyImg"/> 
							</div>
						</div>
			
							{body}
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