import {combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form'
import menuReducer, {moduleName as menuModule} from '../ducks/menu';
import pressReducer, {moduleName as pressModule} from '../ducks/press';
import agencyInfoReducer, {moduleName as agencyInfoModule} from '../ducks/agencyInfo';
import agencyPageReducer, {moduleName as agencyPageModule} from '../ducks/agencyPage';
import langReducer, {moduleName as langModule} from '../ducks/lang';
import portfolioReducer, {moduleName as portfolioModule} from '../ducks/portfolio';
import newsReducer, {moduleName as newsModule} from '../ducks/news';
import newsArticleReducer, {moduleName as newsArticleModule} from '../ducks/newsArticle';
import pressListReducer, {moduleName as pressListModule} from '../ducks/pressList';
import newsListReducer, {moduleName as newsListModule} from '../ducks/newsList';
import instagramReducer, {moduleName as instagramModule} from '../ducks/instagram';
import contactsReducer, {moduleName as contactsModule} from '../ducks/contacts';
import socialFooterReducer, {moduleName as socialFooterModule} from '../ducks/socialFooter';

export default combineReducers({
	[menuModule]: menuReducer,
	[langModule]: langReducer,
	[agencyInfoModule]: agencyInfoReducer,
	[portfolioModule]: portfolioReducer,
	[pressModule]: pressReducer,
	[pressListModule]: pressListReducer,
	[newsModule]: newsReducer,
	[agencyPageModule]: agencyPageReducer,
	[newsListModule]: newsListReducer, 
	[newsArticleModule]: newsArticleReducer,
	[instagramModule]: instagramReducer,
	[contactsModule]: contactsReducer,
	[socialFooterModule]: socialFooterReducer,
	form: formReducer
})