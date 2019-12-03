import React, {Component} from 'react';
import { connect } from 'react-redux'
import { loadPressPage } from '../../ducks/pressPage';
import Loader from '../Loader';
import {Link} from 'react-router-dom';
import ErrorCmp from '../ErrorCmp';
import renderHTML from 'react-render-html'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {Helmet} from "react-helmet";

class AgencyPage extends Component {
	
	componentDidMount(){
		const { match, loadPressPage } = this.props
		//const slug = window.location.pathname.split("/").filter(item => item !== "")[2];
        const id = window.location.href.split('/').filter(item => item !== "").pop();

		//loadPressPage( id ? match.params.id : id, isNaN(match.params.id))
		loadPressPage(id)
	}

	componentWillReceiveProps(nextProps){
		const { match, loadPressPage, useLang } = this.props

	}

	render(){
		const {match, entities, useLang, loading, error} = this.props
		const i18 = useLang == "ru" ? "ru" : "en-US";

		const allPublics = useLang == "ru" ? "Все публикации" : "All publications";
		const i18Date = useLang == "ru" ? "ru-RU" : "en-GB";

		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);

		const date = new Date(entities.acf.date);

		var options = {
		  day: 'numeric',
		  month:  'long',
		  year: 'numeric'
		};

		return (
			<div className="pressPage">
                <Helmet>
                    <title>WeDoAgency | {useLang === 'ru' ? entities.title.rendered : entities.acf.titleEn}</title>
                </Helmet>
				<ReactCSSTransitionGroup transitionName="anim" 
																 transitionAppear={true} 
																 transitionAppearTimeout={2000}
																 transitionEnter={false} 
																 transitionLeave={false}>
					<div className="container">
						<div className="row no-gutters pressPageMarginBottom10">
							<div className='col-md-12'>
								<div className="fotoTitle">
									{!!entities.acf.public1 && <img src={entities.acf.foto} srcSet={entities.acf.fotox2} />}
								</div>
								<div style={{height: '650px'}}>
									<div className="DateFormat">
										{ date.toLocaleString( i18Date, options)}
									</div>
									<div className="headerTitle">
										{renderHTML(useLang === 'ru' ? entities.title.rendered : entities.acf.titleEn)}
									</div>
									<div className="content">
										<div dangerouslySetInnerHTML={{ __html:  useLang === 'ru' ? entities.content.rendered : entities.acf.textEn}} />
									</div>
								</div>
							</div>	
					 	</div>
			 			<div className="row no-gutters">
			 				<div className="col-md-6">
								{!!entities.acf.public1 && <img src={entities.acf.public1} srcSet={entities.acf.public1x2} />}
			 				</div>
			 				<div className="col-md-6">
			 					{!!entities.acf.public2 && <img src={entities.acf.public2} srcSet={entities.acf.public2x2} />}
			 				</div>
			 			</div>	
			 			<div className="row no-gutters">
			 				<div className="col-md-6">
			 					{!!entities.acf.public3 && <img src={entities.acf.public3} srcSet={entities.acf.public3x2} />}
			 				</div>
			 				<div className="col-md-6">
			 					{!!entities.acf.public4 && <img src={entities.acf.public4} srcSet={entities.acf.public4x2} />}
			 				</div>
			 				<div className='clear' />
			 			</div>	
			 			<div className="row no-gutters">
			 				<div className="col-md-6">
			 					{!!entities.acf.public5 && <img src={entities.acf.public5} srcSet={entities.acf.public5x2} />}
			 				</div>
			 				<div className="col-md-6">
			 					{!!entities.acf.public6 && <img src={entities.acf.public6} srcSet={entities.acf.public6x2} />}
			 				</div>
			 				<div className='clear' />
			 			</div>	
			 			<div className="row no-gutters">
			 				<div className="col-md-6">
			 					{!!entities.acf.public7 && <img src={entities.acf.public7} srcSet={entities.acf.public7x2} />}
			 				</div>
			 				<div className="col-md-6">
			 					{!!entities.acf.public8 && <img src={entities.acf.public8} srcSet={entities.acf.public8x2} />}
			 				</div>
			 				<div className='clear' />
			 			</div>
			 			<div className="row no-gutters">
			 				<div className="col-md-12">
			 					<Link to='/press' className="linkToAllNews">
										{ allPublics }
									</Link>
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
		entities: state.pressPage.entities,
		loading: state.pressPage.loading,
		error: state.pressPage.error
	}
}
	
export default connect(mapStateToProps, {loadPressPage})(AgencyPage)