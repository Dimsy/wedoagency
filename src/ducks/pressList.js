import {appName, LONG} from '../config'
import {Map, Record, OrderedMap} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
import {arrToMap, arrToOrderedMapDate} from './utils'
import {PRESS_LIST_ru, PRESS_LIST_en} from '../config';

 

// Constants

export const moduleName = 'pressList'
const prefix = `${appName}/${moduleName}`
export const LOAD_PRESS_LIST_START = `${prefix}/LOAD_PRESS_LIST_START`
export const CLEAR_PRESS_LIST = `${prefix}/CLEAR_PRESS_LIST`
export const LOAD_PRESS_LIST_SUCCESS = `${prefix}/LOAD_PRESS_LIST_SUCCESS`
export const LOAD_PRESS_LIST_ERROR = `${prefix}/LOAD_PRESS_LIST_ERROR`

var POST_COUNTER = 0;
const POSTS_STEP = 9;

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
		case LOAD_PRESS_LIST_SUCCESS:
			return state
							.set('count', payload.countArticles )
	 						.set('entities', state.get('entities').merge(arrToMap(payload.response.data, ModelData)))
	 						.set('loading', false)

	 	case CLEAR_PRESS_LIST:	 	
	 		console.log('clear');

	 		POST_COUNTER = 0;
	 		return state
	 						.set('loading', true)
	 						.set('entities', Map())
 			
		case LOAD_PRESS_LIST_ERROR:
	 		return state
	 						.set('error', payload.error)
	 						.set('loading', false)
	}

	return state
}


// Action Creators

export function loadPressList(lang){
	return {
		type: LOAD_PRESS_LIST_START,
		payload: {lang}
	}
}

export function clearPressList(lang){
	return {
		type: CLEAR_PRESS_LIST,
	}
}
//Sagas

export function * pressListSaga(action){

	const articleLang = action.payload.lang == 'ru' ? PRESS_LIST_ru : PRESS_LIST_en;

	try {
		const response = yield call(axios.get, `/wp-json/wp/v2/posts?categories=${articleLang}&orderby=date&order=desc&per_page=9&offset=${POST_COUNTER}`);
		POST_COUNTER = POST_COUNTER + 9;

		const count = yield call(axios.get, `/wp-json/wp/v2/categories/${articleLang}`);
		const countArticles = count.data.count;

		yield put({
						type: LOAD_PRESS_LIST_SUCCESS,
						payload: {response, countArticles}
					})
	} catch (error) {
		
		yield put({
						type: LOAD_PRESS_LIST_ERROR,
						payload: {error}
					})
	}
}

export function * saga() {
	yield takeEvery(LOAD_PRESS_LIST_START, pressListSaga)
}

