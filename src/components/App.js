import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import RouteRoot from './Routes/root'
import RouteMainPage from './Routes/mainPage'
import RouteNews from './Routes/news'
import RouteKids from './Routes/kids'
import RouteNewsArticle from './Routes/newsItem'
import RouteContacts from './Routes/contacts'
import RoutePortfolioList from './Routes/portfolioList'
import RouteInstaFooter from './Routes/instaFooter'
import RouteAgencyPage from './Routes/agency'
import RoutePortfolioPage from './Routes/portfolioPage'
import RoutePressList from './Routes/press'
import RoutePressPage from './Routes/pressPage'
import {loadMenu} from '../ducks/menu'
import {loadContacts} from '../ducks/contacts'
import {loadHeader} from '../ducks/header'
import {MENU, CONTACTS} from '../config.js'
import history from '../history'
import NotFound from './NotFound'
import ScrollToTop from './ScrollToTop'
import {loadSocialFooter} from '../ducks/socialFooter';

class App extends Component {

	componentDidMount(){
		const useLang = this.props.useLang
		this.props.loadHeader()
		this.props.loadMenu(useLang)
		this.props.loadContacts(useLang)
		this.props.loadSocialFooter();

	}


	componentWillReceiveProps(nextProps){
		if(this.props.useLang != nextProps.useLang){
			this.props.loadMenu(nextProps.useLang)
			this.props.loadContacts(nextProps.useLang)
			this.props.loadSocialFooter();
		}
	}

	render(){
		const pathArr = window.location.pathname.split('/').filter((item) => item !== "");

		let portfolioPath = '/portfolio';
		let portfolioId = '/:id';

		if (pathArr[0] == 'portfolio_ru') {
            portfolioPath = '/portfolio_ru';
            if (pathArr.length > 1) {
                portfolioId = '/'+decodeURI(pathArr[1]);
			}
		}

        let newsPath = '/news';
        let newsId = '/:id';

        //TODO: ID не работает
        if (pathArr[0] == 'news_ru') {
            newsPath = '/news_ru';
            if (pathArr.length > 1) {
                newsId = '/'+decodeURI(pathArr[1]);
            }
        }

        let pressPath = '/press';
        let pressId = '/:id';
        if (pathArr[0] == 'press_list_ru') {
			pressPath = '/press_list_ru';
			if (pathArr.length > 1) {
				pressId = '/' + decodeURI(pathArr[1]);
			}
        } else if (pathArr[0] == 'category' && pathArr[1] == 'press_list_ru') {
            pressPath = '/category/press_list_ru';
        }

		let contactsPath = '/main_page_ru/contacts';

        if (pathArr[0] == 'contacts') {
            if (this.props.useLang === 'en') {
                contactsPath = '/main_page_en/contacts';
            } else {
                contactsPath = '/main_page_ru/contacts';
            }
        }
		//

		return (
			<ConnectedRouter history={history}>
				<ScrollToTop>
				<div>
					<Route path="/" component={RouteRoot} />
						<Switch>
							<Route path="/" component={RouteMainPage} exact/>
							<Route path="/page/agency" component={RouteAgencyPage} exact/>
							<Route path={pressPath} component={RoutePressList} exact/>
                            <Route path={pressPath+pressId} component={RoutePressPage} exact/>
							<Route path={portfolioPath} component={RoutePortfolioList} exact/>
							<Route path={portfolioPath+portfolioId} component={RoutePortfolioPage} exact/>
							<Route path={newsPath} component={RouteNews} exact/>
							<Route path={newsPath+newsId} component={RouteNewsArticle} exact/>
							{/*<Route path="/kids" component={() => window.location = 'https://kids.wedoagency.ru/'} exact/>*/}
							<Route path="/kids" component={RouteKids} exact/>
							<Route path={contactsPath} component={RouteContacts} exact/>
						</Switch>
					<Route path="/" component={RouteInstaFooter} />
				</div>
				</ScrollToTop>
			</ConnectedRouter>

		)
	}
}

const mapStateToProps = state => {
	return {
		useLang: state.lang.useLang
	}
}

export default connect(mapStateToProps, {loadMenu, loadContacts, loadSocialFooter, loadHeader})(App)