import {combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form'
import menuReducer, {moduleName as menuModule} from '../ducks/menu';
import pressReducer, {moduleName as pressModule} from '../ducks/press';
import agencyInfoReducer, {moduleName as agencyInfoModule} from '../ducks/agencyInfo';
import langReducer, {moduleName as langModule} from '../ducks/lang';
import portfolioReducer, {moduleName as portfolioModule} from '../ducks/portfolio';
import newsReducer, {moduleName as newsModule} from '../ducks/news';
import contactsReducer, {moduleName as contactsModule} from '../ducks/contacts';

export default combineReducers({
	[menuModule]: menuReducer,
	[langModule]: langReducer,
	[agencyInfoModule]: agencyInfoReducer,
	[portfolioModule]: portfolioReducer,
	[pressModule]: pressReducer,
	[newsModule]: newsReducer,
	[contactsModule]: contactsReducer,
	form: formReducer
})