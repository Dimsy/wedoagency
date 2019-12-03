import {appName} from '../config'
import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import {arrToMap} from './utils'		
import axios from 'axios'
import {PORTFOLIO_en, PORTFOLIO_ru, PORTFOLIO_LIST} from '../config'


// Constants
export const moduleName = 'portfolio'
const prefix = `${appName}/${moduleName}`
export const LOAD_PORTFOLIO_START = `${prefix}/LOAD_PORTFOLIO_START`
export const LOAD_PORTFOLIO_SUCCESS = `${prefix}/LOAD_PORTFOLIO_SUCCESS`
export const LOAD_PORTFOLIO_ERROR = `${prefix}/LOAD_PORTFOLIO_ERROR`
var POST_COUNTER = 0;
const POSTS_STEP = 12;

const ModelData = Record({
	acf: null,
	id: null,
	title: null,
	date: null,
	content: null
})

// Reducer
const ReducerState = Record({
	entities: Map(),
	catName: null,
	portfolioList: Map(),
	count: null,
	error: null,
	loading: true
})

export default function reducer(state = new ReducerState(), action) {
	const {type, payload} = action

	switch(type){
		case LOAD_PORTFOLIO_SUCCESS:
	 		return state
	 						.set('entities', state.get('entities').merge(arrToMap(payload.response.data, ModelData)))
	 						.set('catName', payload.responseCatName.data.name)
	 						.set('portfolioList', payload.portfolioList.data)
	 						.set('count', payload.countProjects)
	 		 				.set('loading', false)
	 			
		case LOAD_PORTFOLIO_ERROR:
	 		return state
	 						.set('error', payload.error)
	 						.set('loading', false)
	}

	return state
}


// Action Creators
export function loadPortfolio(lang){
	return {
		type: LOAD_PORTFOLIO_START,
		payload: {lang}
	}
}


//Sagas
export function * loadPortfolioSaga(action){
	const articleLang = action.payload.lang == 'ru' ? PORTFOLIO_ru : PORTFOLIO_en;

	try {
        const response = yield call(axios.get, `/wp-json/wp/v2/posts?categories=${articleLang}&orderby=date&order=desc&per_page=100&offset=${POST_COUNTER}`);
        //const response = yield call(axios.get, `/wp-json/wp/v2/posts?filter[category_name]=${articleLang}`);
		const responseCatName = yield call(axios.get, `/wp-json/wp/v2/categories/${articleLang}`);
		const portfolioList = yield call(axios.get, `/wp-json/wp/v2/posts/${PORTFOLIO_LIST}`);

		const count = yield call(axios.get, `/wp-json/wp/v2/categories/${articleLang}`);
		const countProjects = count.data.count;

		POST_COUNTER = POST_COUNTER + POSTS_STEP;

		yield put({
						type: LOAD_PORTFOLIO_SUCCESS,
						payload: {response, responseCatName, portfolioList, countProjects}
					})
	} catch (error) {
		
		yield put({
						type: LOAD_PORTFOLIO_ERROR,
						payload: {error}
					})
	}
}

export function * saga() {
	yield takeEvery(LOAD_PORTFOLIO_START, loadPortfolioSaga);
}