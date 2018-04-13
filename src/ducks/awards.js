import {appName} from '../config'
import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
import {AWARDS_ru, AWARDS_en} from '../config'

 

// Constants

export const moduleName = 'awards'
const prefix = `${appName}/${moduleName}`
export const LOAD_AWARDS_START = `${prefix}/LOAD_AWARDS_START`
export const LOAD_AWARDS_SUCCESS = `${prefix}/LOAD_AWARDS_SUCCESS`
export const LOAD_AWARDS_ERROR = `${prefix}/LOAD_AWARDS_ERROR`


// Reducer

const ReducerState = Record({
	entities: Map(),
	catName: null,
	error: null,
	loading: true
})

export default function reducer(state = new ReducerState(), action) {
	const {type, payload} = action;

	switch(type){
		case LOAD_AWARDS_SUCCESS:
	 		return state
	 						.set('entities', payload.response.data)
	 						.set('catName', payload.responseCatName.data.name)
	 		 				.set('loading', false)
	 			
		case LOAD_AWARDS_ERROR:
	 		return state
	 						.set('error', payload.error)
	 						.set('loading', false)
	}

	return state
}


// Action Creators

export function loadAwards(lang){
	return {
		type: LOAD_AWARDS_START,
		payload: {lang}
	}
}


//Sagas

export function * loadAwardsSaga(action){
	const articleLang = action.payload.lang == 'ru' ? AWARDS_ru : AWARDS_en;

	try {
		const response = yield call(axios.get, `/wp-json/wp/v2/posts?categories=${articleLang}`)
		const responseCatName = yield call(axios.get, `/wp-json/wp/v2/categories/${articleLang}`);
		
		yield put({
						type: LOAD_AWARDS_SUCCESS,
						payload: {response, responseCatName}
					})
	} catch (error) {
		
		yield put({
						type: LOAD_AWARDS_ERROR,
						payload: {error}
					})
	}
}

export function * saga() {
	yield takeEvery(LOAD_AWARDS_START, loadAwardsSaga);
}