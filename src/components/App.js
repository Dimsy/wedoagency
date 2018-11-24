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
		
		return (
			<ConnectedRouter history={history}>
				<ScrollToTop>
				<div>
					<Route path="/" component={RouteRoot} />
						<Switch>
							<Route path="/" component={RouteMainPage} exact/>
							<Route path="/agency" component={RouteAgencyPage} exact/>
							<Route path="/press" component={RoutePressList} exact/>
							<Route path="/portfolio" component={RoutePortfolioList} exact/>
							<Route path="/portfolio/:id" component={RoutePortfolioPage} exact/>
							<Route path="/press/:id" component={RoutePressPage} exact/>
							<Route path="/news" component={RouteNews} exact/>
							<Route path="/news/:id" component={RouteNewsArticle} exact/>
							{/*<Route path="/kids" component={() => window.location = 'http://kids.wedoagency.ru/'} exact/>*/}
							<Route path="/kids" component={RouteKids} exact/>
							<Route path="/contacts" component={RouteContacts} exact/>
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