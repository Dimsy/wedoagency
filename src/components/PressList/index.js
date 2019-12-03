import React, {Component} from 'react'
import {loadPressList, clearPressList} from '../../ducks/pressList.js';
import {connect} from 'react-redux';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import PressItem from './pressItem';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import $ from "jquery";
import {Helmet} from "react-helmet";

class PressList extends Component{

	componentDidMount(){
		const { useLang, loadPressList } = this.props;

		loadPressList('ru');
	}


	componentWillReceiveProps(nextProps){
		const {useLang, clearPressList, loadPressList} = this.props
		
		if(useLang != nextProps.useLang){
			//clearPressList();
			//loadPressList('ru');
		}
	}

	addingPress = () => {
		const { useLang, loadPressList } = this.props;

		loadPressList('ru');
	}

	sortBody = (a, b) => {

		const aDate = a.props.children.props.item.acf.date
		const bDate = b.props.children.props.item.acf.date

		var aNumberForCompare = aDate.split('/').reverse().join()
    var bNumberForCompare = bDate.split('/').reverse().join()	
        		
    return aNumberForCompare > bNumberForCompare ? -1 : (aNumberForCompare < bNumberForCompare ? 1 : 0);
	 	
	}
	
	render(){
		const { useLang, entities, loading, error, count, match} = this.props;

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);

            $("#veil").removeClass('fadein').addClass("fadeout");


		const pressItems = entities.toArray();

		const body = pressItems.map( item => <li key={item.id}><PressItem item={item} match={match}/></li>).sort(this.sortBody)

		const showMore = useLang == "ru" ? "Показать еще" : "Show more";
		const title = useLang == "ru" ? "Пресса" : "Press";
		const toggleShowMore = body.length != count  ? showMore : null;

		const showTitle = window.innerWidth < 768 ? <div className="row no-gutters">
																									<div className="col-md-12">
																										<h1>{title}</h1>
																									</div>
																								</div> 
																							: false
					
		return (
			<div className='container pressList'>
                <Helmet>
                    <title>WeDoAgency | {title}</title>
                </Helmet>
				<ReactCSSTransitionGroup transitionName="anim" 
																 transitionAppear={true} 
																 transitionAppearTimeout={2000}
																 transitionEnter={false} 
																 transitionLeave={false}>
					{showTitle}
					<div className="row no-gutters">
						<div className="col-md-12">
							<ul className="pressList_set">
								{body}
							</ul>
							<div className='clear' />
							<div className='showMore'>
								<span onClick={this.addingPress}>
									{toggleShowMore}
								</span>	
							</div>	
						</div>
					</div>		
				</ReactCSSTransitionGroup>	
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		useLang: state.lang.useLang,
		entities: state.pressList.entities,
		count: state.pressList.count,
		loading: state.pressList.loading,
		error: state.pressList.error
	}
}

export default connect(mapStateToProps, {loadPressList, clearPressList})(PressList);