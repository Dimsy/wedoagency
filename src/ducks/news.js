import {appName, LONG} from '../config'
import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
import {arrToMap} from './utils'
import {NEWS_ru, NEWS_en} from '../config';


// Constants

export const moduleName = 'news'
const prefix = `${appName}/${moduleName}`
export const LOAD_NEWS_START = `${prefix}/LOAD_NEWS_START`
export const LOAD_NEWS_SUCCESS = `${prefix}/LOAD_NEWS_SUCCESS`
export const LOAD_NEWS_ERROR = `${prefix}/LOAD_NEWS_ERROR`


// Reducer

const ModelData = Record({
	acf: null,
	id: null,
	title: null,
	date: null,
	content: null,
	link: null,
})

const ReducerState = Record({
	entities: Map(),
	catName: null,
	error: null,
	loading: true
})

export default function reducer(state = new ReducerState(), action) {
	const {type, payload} = action

	switch(type){
		case LOAD_NEWS_SUCCESS:
	 		return state
	 						.set('entities', state.get('entities').merge(arrToMap(payload.response.data, ModelData)))
	 						.setIn(['catName'], payload.responseCatName.data.name)
	 		 				.setIn(['loading'], false)
	 			
		case LOAD_NEWS_ERROR:
	 		return state
	 						.setIn(['error'], payload.error)
	 						.setIn(['loading'], false)
	}

	return state
}



// Action Creators

export function loadNews(lang){
	return {
		type: LOAD_NEWS_START,
		payload: {lang}
	}
}

//Sagas

export function * newsSaga(action){

	const articleLang = action.payload.lang == 'ru' ? NEWS_ru : NEWS_en;

	try {
		const response = yield call(axios.get, `/wp-json/wp/v2/posts?categories=${articleLang}&orderby=date&order=desc&per_page=10`);
		const responseCatName = yield call(axios.get, `/wp-json/wp/v2/categories/${articleLang}`);

		yield put({
						type: LOAD_NEWS_SUCCESS,
						payload: {response, responseCatName}
					})
	} catch (error) {
		


		yield put({
						type: LOAD_NEWS_ERROR,
						payload: {error}
					})
	}
}

export function * saga() {
	yield takeEvery(LOAD_NEWS_START, newsSaga)
}

