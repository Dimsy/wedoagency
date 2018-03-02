import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import { loadNewsArticleList } from '../../ducks/newsArticle';
import { Grid, Row, Col } from 'react-bootstrap';
import renderHTML from 'react-render-html'
import {Link} from 'react-router-dom';

class NewsArticle extends Component{
	
	componentDidMount(){
		const { match } = this.props
		this.props.loadNewsArticleList(match.params.id)
	}

	foto = (data, key) => {
		const ftx2 = data['ftx2' + key.substring(4)] || data[key]

		return ( 
							<Row key={key}>
								<Col md={12}>
									<img src={data[key]} srcSet={ `${ftx2} 2x`} className="newsBodyImg"/> 
								</Col>
							</Row>
					)		
	}

	slog = (key, item) => {

		return (
						<Row key={key}>
							<Col md={3}>
							</Col>
							<Col md={6}>		
								<div className="articleContent">
									<h2>
										{ renderHTML(item) }
									</h2>
								</div>
							</Col>
						</Row>
					)
	}

	text = (key, item) => {
		return (
						<Row key={key}>
							<Col md={2}>
							</Col>
							<Col md={8}>		
								<div className="articleContent afterImg">
									{ renderHTML(item) }
								</div>
							</Col>
						</Row>
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
		
		return (
			<div>
				<div className="articleImgNews" style={divStyle} />
				<div className="articleDate">
					{date.toLocaleString( i18, options)}
				</div>
				<div>
					<Grid>
						<Row>
							<Col md={2}>
							</Col>
							<Col md={8}>
								<div className="articleTitle">			
									{article.title.rendered}
								</div>			
								<div className="articleContent">
									{article.content.rendered}
								</div>
							</Col>
						</Row>
					
						<Row>
							<Col md={12}>
								<img src={article.acf.bodyImgNews} srcSet={ `${article.acf.bodyImgNewsx2} 2x`} className="newsBodyImg"/> 
							</Col>
						</Row>
			
							{body}
			
						<Row>
							<Col>		
								<Link to='/news' className="linkToAllNews">
									{ allNews }
								</Link>
							</Col>
						</Row>
					</Grid>
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