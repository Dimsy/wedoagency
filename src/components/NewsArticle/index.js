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

	render(){
		const {match, entities, useLang, loading, error} = this.props

		console.log('---', match, this.props)
		
		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);	

	
		const article = entities;

		const i18 = useLang == "ru" ? "ru" : "en-US";
		const allNews = useLang == "ru" ? "Все новости" : "all news";

		const date =  new Date(article.date);

		var options = {
		  day: 'numeric',
		  month: 'long',
		  year: 'numeric'
		};


		console.log('article.content.firstPartArticle', article.content.firstPartArticle)

		return (
			<div>
				<div className="articleHeader">
					<img src={article.acf.headImgNews} srcSet={ `${article.acf.headImgNewsx2} 2x`} /> 
				</div>
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
				
						<Row>
							<Col md={2}>
							</Col>
							<Col md={8}>		
								<div className="articleContent afterImg">
									{ renderHTML(article.acf.firstPartArticle)}
								</div>
							</Col>
						</Row>
						<Row>
							<Col md={3}>
							</Col>
							<Col md={6}>		
								<div className="articleContent">
									<h2>
										{article.acf.slogan}
									</h2>
								</div>
							</Col>
						</Row>
						<Row>
							<Col md={2}>
							</Col>
							<Col md={8}>		
								<div className="articleContent">
									{ renderHTML(article.acf.secondPartArticle) }
								</div>
								<Link to='/news' className="linkToAllNews">{ allNews }</Link>
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