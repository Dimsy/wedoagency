import React, {Component} from 'react';
import {connect} from 'react-redux';
import NewsItem from './NewsItem';
import { loadNews } from '../../ducks/news';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import { Grid, Row, Col } from 'react-bootstrap';

class NewsList extends Component{

	componentDidMount(){
    const useLang = this.props.useLang;
    if (this.props.entities != null) return;

		this.props.loadNews(useLang);
	}

	componentWillReceiveProps(nextProps){
		if(this.props.useLang != nextProps.useLang)
			this.props.loadNews(nextProps.useLang);
	}

	render(){
		const { useLang, entities, loading, error} = this.props;

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);	
		
		const body = entities.map(item => <li key={item.id}><NewsItem item={item} /></li>);

		return (
			<ul>
				{body}
			</ul>					
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

export default connect(mapStateToProps, { loadNews })(NewsList);