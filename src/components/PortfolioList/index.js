import React, {Component} from 'react'
import {loadPortfolio} from '../../ducks/portfolio';
import {connect} from 'react-redux';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import PortfolioListItem from './PortfolioListItem';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import $ from "jquery";
import moment from 'moment';
import VideoHeader from '../PortfolioPage/VideoHeader'
import {Helmet} from "react-helmet";

class PortfolioList extends Component{
    state = {
        visibleItems: 11
    };

	componentDidMount(){
        const { store } = this.context;
        console.log(store)
		const { useLang, loadPortfolio } = this.props;

		if (this.props.entities.toArray().length < 9){
			loadPortfolio(useLang)
		}
	}

	componentWillReceiveProps(nextProps){
		if(this.props.useLang != nextProps.useLang){
			this.props.loadPortfolio(nextProps.useLang);
		}
	}

	sortBodyByDate = (a, b) => {
		const aDate = a.acf.DataOfFinnish;
		const bDate = b.acf.DataOfFinnish;

		if (aDate === bDate) return 0;
		var aNumberForCompare = moment(aDate.split('/').reverse().join('-'));
		var bNumberForCompare = moment(bDate.split('/').reverse().join('-'));

		return aNumberForCompare.isAfter(bNumberForCompare) ? -1 : 1;
  		//return aNumberForCompare > bNumberForCompare ? -1 : (aNumberForCompare < bNumberForCompare ? 1 : 0);
	}

    sortBodyByPublicDate = (a, b) => {
        const aDate = a.acf.publicDate;
        const bDate = b.acf.publicDate;

        if (aDate === bDate) return 0;
        var aNumberForCompare = moment(aDate.split('/').reverse().join('-'));
        var bNumberForCompare = moment(bDate.split('/').reverse().join('-'));

        return aNumberForCompare.isAfter(bNumberForCompare) ? -1 : 1;
        //return aNumberForCompare > bNumberForCompare ? -1 : (aNumberForCompare < bNumberForCompare ? 1 : 0);
    }

	filterByIsPublicDate = (item) => {
		return !!item.acf.publicDate;
	};

    filterByNoPublicDate = (item) => {
        return !item.acf.publicDate;
    };

	render(){
		const { useLang, entities, loading, error, count, match, portfolioList} = this.props;
		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);

        //document.getElementById('veil').style.visibility = "hidden";
            $("#veil").removeClass('fadein').addClass("fadeout");


		const projectsItems = entities.toArray();
		/*
		const body = projectsItems.map( item => <li key={item.id}>
																 							<PortfolioListItem item={item} match={match}/>
																 							<div className="portfolioItem__mobile-padding" />
															 							</li>).sort(this.sortBody)
		*/
		let body = [];
		let filtredPublic = projectsItems.filter(this.filterByIsPublicDate);
		let sortedPublic = filtredPublic.sort(this.sortBodyByPublicDate);

		let filteredNoPublic = projectsItems.filter(this.filterByNoPublicDate);
		let sortedNoPublic = filteredNoPublic.sort(this.sortBodyByDate);

		let sortedItems = sortedPublic.concat(sortedNoPublic);
		for (let i=0; i<= sortedItems.length-1; i++) {

			if (i <= this.state.visibleItems) {
                body.push(
                    <li key={sortedItems[i].id} className="pItemFadeIn">
                        <PortfolioListItem item={sortedItems[i]} match={match}/>
                        <div className="portfolioItem__mobile-padding"/>
                    </li>)
            }

		}
		if( body.length === 0 ){
			return <div>Данные недоступны</div>
		}
		
		const showMore = useLang == "ru" ? "Показать еще" : "Show more";
		const projects = useLang == "ru" ? "Портфолио" : "Portfolio";
		const toggleShowMore = body.length != count ? <div className='showMore'>
																									  <span onClick={this.addingPress}>
																									    {showMore}
																									  </span>
																									</div>
																								: null;

		const headerPc = {
			backgroundImage: `-webkit-image-set( url(${portfolioList.acf.foto}) 1x, url(${portfolioList.acf.fotox2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${portfolioList.acf.foto}) 1x, url(${portfolioList.acf.fotox2}) 2x )`,
			backgroundImage: `-o-image-set( url(${portfolioList.acf.foto}) 1x, url(${portfolioList.acf.fotox2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${portfolioList.acf.foto}) 1x, url(${portfolioList.acf.fotox2}) 2x )`,
			backgroundImage: `url(${portfolioList.acf.foto})`,
			marginBottom: '100px'
		} || null;

        const headerMobile = {
            backgroundImage: `-webkit-image-set( url(${portfolioList.acf.photoMobile}) 1x, url(${portfolioList.acf.photoMobile}) 2x )`,
            backgroundImage: `-moz-image-set( url(${portfolioList.acf.photoMobile}) 1x, url(${portfolioList.acf.photoMobile}) 2x )`,
            backgroundImage: `-o-image-set( url(${portfolioList.acf.photoMobile}) 1x, url(${portfolioList.acf.photoMobile}) 2x )`,
            backgroundImage: `-ms-image-set( url(${portfolioList.acf.photoMobile}) 1x, url(${portfolioList.acf.photoMobile}) 2x )`,
            backgroundImage: `url(${portfolioList.acf.photoMobile})`,
            marginBottom: '100px'
        } || null;

		//const titleArticle = window.innerWidth > 768 ? <div className="articleImgNews" style={header} /> : null

        const titleArticle = window.innerWidth < 768 ? <div className="articleImgNews" style={headerMobile} />
            : portfolioList.acf.headerVideo
                ? <VideoHeader src={portfolioList.acf.headerVideo.url} key={portfolioList.acf.headerVideo.url} />
                : <div className="articleImgNews" style={headerPc} />

		return (
			<div className='portfolioList'>
                <Helmet>
                    <title>WeDoAgency | {projects}</title>
                </Helmet>
				<ReactCSSTransitionGroup transitionName="anim" 
																 transitionAppear={true} 
																 transitionAppearTimeout={2000}
																 transitionEnter={false} 
																 transitionLeave={false}>
					{titleArticle}
					<div className="container">
						<div className="row no-gutters">
							<div className="col-md-12">
								<h1>{projects}</h1>
							</div>
						</div>
						<div className="row no-gutters">
							<div className="col-12">
								<ul className="portfolio__containerItems">
									{body}
								</ul>
								<div className='clear' />
								{toggleShowMore}
							</div>
						</div>
					</div>
				</ReactCSSTransitionGroup> 	
			</div>	
		)
	}

	addingPress = () => {
		const { useLang } = this.props;
		this.setState({visibleItems: this.state.visibleItems + 12})
		//this.props.loadPortfolio(useLang);
	}
}

const mapStateToProps = state => {
	return {
		useLang: state.lang.useLang,
		entities: state.portfolio.entities,
		portfolioList: state.portfolio.portfolioList,
		count: state.portfolio.count,
		loading: state.portfolio.loading,
		error: state.portfolio.error
	}
}

export default connect(mapStateToProps, {loadPortfolio})(PortfolioList);