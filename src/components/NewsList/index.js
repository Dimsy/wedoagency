import React, {Component} from 'react';
import {connect} from 'react-redux';
import NewsItem from './NewsItem';
import { loadNews, updateNews } from '../../ducks/news';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import { Grid, Row, Col } from 'react-bootstrap';

class NewsList extends Component{

	componentDidMount(){
    const { useLang } = this.props;
    	// if (this.props.entities != null) return;
		this.props.loadNews(useLang);
	}

	componentWillReceiveProps(nextProps){
		if(this.props.useLang != nextProps.useLang)
			this.props.loadNews(nextProps.useLang);
	}

	test = () => {
		const { useLang } = this.props;
		this.props.loadNews(useLang);
	}
	render(){
		const { useLang, entities, loading, error} = this.props;

		const posts = entities.toArray();

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);	
		
		const body = posts.map(item => <li key={item.id}><NewsItem item={item} /></li>);
		const showMore = useLang == "ru" ? "Показать еще" : "en-US";


		return (
			<div className="newsList">
				<ul>
					{body}
				</ul>	
				<div className="showMore">
					<span onClick={this.test}>
						{showMore }
					</span>	
				</div>	
			</div>			
		)
	}
}

const mapStateToProps = state => {
	return {
		useLang: state.lang.useLang,
		entities: state.news.entities,
		loading: state.news.loading,
		error: state.news.error
	}
}

export default connect(mapStateToProps, { loadNews, updateNews })(NewsList);