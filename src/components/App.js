import React, {Component} from 'react' 
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import RouteRoot from './Routes/root'
import RouteMainPage from './Routes/mainPage'
import RouteNews from './Routes/news'
import RouteNewsArticle from './Routes/newsItem'
import RouteContacts from './Routes/contacts'
import RouteInstaFooter from './Routes/instaFooter'
import {loadMenu} from '../ducks/menu'
import {loadContacts} from '../ducks/contacts'
import {MENU, CONTACTS} from '../config.js'
import history from '../history'
import NotFound from './NotFound'

class App extends Component {

	componentDidMount(){
		const useLang = this.props.useLang;
		this.props.loadMenu(useLang)
	// 	this.props.loadContacts(CONTACTS)
	}
	
	componentWillReceiveProps(nextProps){
		if(this.props.useLang != nextProps.useLang)
			this.props.loadMenu(nextProps.useLang)
	}

	render(){
		
		return (
			<ConnectedRouter history={history}>
				<div>
					<Route path="/" component={RouteRoot} />
					<Switch>
						<Route path="/" component={RouteMainPage} exact/>
						<Route path="/news" component={RouteNews} exact/>
						<Route path="/news/:id" component={RouteNewsArticle} exact/>
						<Route path="/contacts" component={RouteContacts} exact/>
					</Switch>
					<Route path="/" component={RouteInstaFooter} />
				</div>
				{/*<Route path="/" component={RouteRoot} exact/>
					<Route path="/news" component={RouteNews} exact/>
					<Route path="/news/:id" component={RouteNewsItem} exact/>
					<Route path="/contacts" component={RouteContacts} exact/>
				*/}
				
			</ConnectedRouter>

		)
	}
}

const mapStateToProps = state => {
	return {
		useLang: state.lang.useLang
	}
}

export default connect(mapStateToProps, {loadMenu})(App)

// return (
// 			<div>
// 				<ConnectedRouter history={history}>
// 					<div>
// 						<Route path="/" component={Menu} />
// 						<Route path="/" component={ImgMenu} exact/>
// 						<Route path="/" component={About} exact/>
// 						<Route path="/" component={News} exact/>
// 						<Route path="/news" component={ImgMenu} exact/>
// 						<Route path="/news" component={About} exact/>
// 						<Route path="/news" component={News} exact/>
// 						<Route path="/catalogue" component={ImgMenu } exact/>
// 						<Route path="/catalogue/:type" component={AromGroup} />
// 						<Route path="/assortment" component={Assortment} exact/>
// 						<Route path="/distribs" component={Distribs} exact/>
// 						<Route path="/vendors" component={Vendors} exact/>
// 						<Route path="/contacts" component={Contacts} exact/>	
// 					</div>					
// 				</ConnectedRouter>
// 				<Footer />
// 			</div>
// 		)
// 	}