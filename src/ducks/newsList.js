import {appName, LONG} from '../config'
import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
import {arrToMap} from './utils'
import {NEWS_ru, NEWS_en} from '../config';

 

// Constants

export const moduleName = 'newsList'
const prefix = `${appName}/${moduleName}`
export const LOAD_NEWS_LIST_START = `${prefix}/LOAD_NEWS_LIST_START`
export const CLEAR_NEWS_LIST = `${prefix}/CLEAR_NEWS_LIST`
export const LOAD_NEWS_LIST_SUCCESS = `${prefix}/LOAD_NEWS_LIST_SUCCESS`
export const LOAD_NEWS_LIST_ERROR = `${prefix}/LOAD_NEWS_LIST_ERROR`

var POST_COUNTER = 0;
const POSTS_STEP = 3;

// Reducer

const ModelData = Record({
	acf: null,
	id: null,
	title: null,
	date: null,
	content: null
})

const ReducerState = Record({
	entities: Map(),
	count: null,
	error: null,
	loading: true
})

export default function reducer(state = new ReducerState(), action) {
	const {type, payload} = action

	switch(type){
		case LOAD_NEWS_LIST_SUCCESS:
			return state
							.set('count', payload.countArticles )
	 						.set('entities', state.get('entities').merge(arrToMap(payload.response.data, ModelData)))
	 		 				.set('loading', false)

	 	case CLEAR_NEWS_LIST:	 	
	 		POST_COUNTER = 0;
	 		return state
	 						.set('loading', true)
	 						.set('entities', Map())
 			
		case LOAD_NEWS_LIST_ERROR:
	 		return state
	 						.set('error', payload.error)
	 						.set('loading', false)
	}

	return state
}


// Action Creators

export function loadNewsList(lang){
	return {
		type: LOAD_NEWS_LIST_START,
		payload: {lang}
	}
}

export function clearNewsList(lang){
	return {
		type: CLEAR_NEWS_LIST,
	}
}
//Sagas

export function * newsListSaga(action){

	const articleLang = action.payload.lang == 'ru' ? NEWS_ru : NEWS_en;

	try {
		
		const response = yield call(axios.get, `/wp-json/wp/v2/posts?categories=${articleLang}&orderby=date&order=desc&per_page=5&offset=${POST_COUNTER}`);
		POST_COUNTER = POST_COUNTER + 5;

		const count = yield call(axios.get, `/wp-json/wp/v2/categories/${articleLang}`);
		const countArticles = count.data.count;
	
		yield put({
						type: LOAD_NEWS_LIST_SUCCESS,
						payload: {response, countArticles}
					})
	} catch (error) {
		
		yield put({
						type: LOAD_NEWS_LIST_ERROR,
						payload: {error}
					})
	}
}

export function * saga() {
	yield takeEvery(LOAD_NEWS_LIST_START, newsListSaga)
}

