import React, {Component} from 'react';
import {connect} from 'react-redux';
import NewsItem from './NewsItem';
import { loadNewsList, clearNewsList } from '../../ducks/newsList';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import $ from "jquery";
import {Helmet} from "react-helmet";

class NewsList extends Component{

	componentDidMount(){
    const { useLang, entities } = this.props;
    
    if ( entities.size == 0){
			this.props.loadNewsList(useLang);
    }
		
	}

	componentWillReceiveProps(nextProps){
		if(this.props.useLang != nextProps.useLang){
			this.props.clearNewsList();
			this.props.loadNewsList(nextProps.useLang);
		}
	}

	addingNews = () => {
		const { useLang } = this.props;
		this.props.loadNewsList(useLang);
	}
	render(){
		const { useLang, entities, loading, error, count, location, match} = this.props;

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);
        //document.getElementById('veil').style.visibility = "hidden";

            $("#veil").removeClass('fadein').addClass("fadeout");


		const posts = entities.toArray();
		
		const showMore = useLang == "ru" ? "Показать еще" : "Show more";
		const title = useLang == "ru" ? "Новости" : "News";
		const body = posts.map(item => <li key={item.id}><NewsItem item={item} localiton={location} match={match}/></li>);

		const mobileTitle = window.innerWidth < 992 ? <div className="container">
																										<div className="row no-gutters">
																											<div className="col-md-8 offset-md-2 newsList__title">
																												<h1>{title}</h1> 
																											</div>
																										</div>
																									</div>
																								: null

		const toggleShowMore = body.length != count  ? showMore : null;

		return (
			<div className="newsList">
                <Helmet>
                    <title>WeDoAgency | {title}</title>
                </Helmet>
				<ReactCSSTransitionGroup transitionName="anim" 
																 transitionAppear={true} 
																 transitionAppearTimeout={2000}
																 transitionEnter={false} 
																 transitionLeave={false}>
					{mobileTitle}
					<ul className="newsList__collection">
						{body}
					</ul>	
					<div className="showMore">
						<span onClick={this.addingNews}>
							{toggleShowMore}
						</span>	
					</div>	
				</ReactCSSTransitionGroup>	
			</div>			
		)
	}
}

const mapStateToProps = state => {
	return {
		useLang: state.lang.useLang,
		count:  state.newsList.count,
		entities: state.newsList.entities,
		loading: state.newsList.loading,
		error: state.newsList.error
	}
}

export default connect(mapStateToProps, { loadNewsList, clearNewsList })(NewsList);