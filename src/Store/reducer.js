import {combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form'
import menuReducer, {moduleName as menuModule} from '../ducks/menu';
import videoReducer, {moduleName as videoModule} from '../ducks/video';
import agencyInfoReducer, {moduleName as agencyInfoModule} from '../ducks/agencyInfo';
import langReducer, {moduleName as langModule} from '../ducks/lang';
import portfolioReducer, {moduleName as portfolioModule} from '../ducks/portfolio';
import contactsReducer, {moduleName as contactsModule} from '../ducks/contacts';

export default combineReducers({
	[menuModule]: menuReducer,
	[langModule]: langReducer,
	[agencyInfoModule]: agencyInfoReducer,
	[portfolioModule]: portfolioReducer,
	[videoModule]: videoReducer,
	[contactsModule]: contactsReducer,
	form: formReducer
})