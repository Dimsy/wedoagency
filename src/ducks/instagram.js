import {appName} from '../config'
import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
import {INSTAGRAM_ru, INSTAGRAM_en} from '../config'

 

// Constants

export const moduleName = 'instagram'
const prefix = `${appName}/${moduleName}`
export const LOAD_INSTAGRAM_START = `${prefix}/LOAD_INSTAGRAM_START`
export const LOAD_INSTAGRAM_SUCCESS = `${prefix}/LOAD_INSTAGRAM_SUCCESS`
export const LOAD_INSTAGRAM_ERROR = `${prefix}/LOAD_INSTAGRAM_ERROR`


// Reducer

const ReducerState = Record({
	entities: new Map(),
	error: null,
	loading: true
})

export default function reducer(state = new ReducerState(), action) {
	const {type, payload} = action;

	switch(type){
		case LOAD_INSTAGRAM_SUCCESS:
	 		return state
	 						.setIn(['entities'], payload.response)
	 		 				.setIn(['loading'], false)
	 			
		case LOAD_INSTAGRAM_ERROR:
	 		return state
	 						.setIn(['error'], payload.error)
	 						.setIn(['loading'], false)
	}

	return state
}


// Action Creators

export function loadInstagram(lang){
	return {
		type: LOAD_INSTAGRAM_START,
		payload: {lang}
	}
}


//Sagas

export function * loadInstagramSaga(action){
	const articleLang = action.payload.lang == 'ru' ? INSTAGRAM_ru : INSTAGRAM_en;

	try {
		const response = yield call(axios.get, `/wp-json/wp/v2/posts/${articleLang}`)

		yield put({
						type: LOAD_INSTAGRAM_SUCCESS,
						payload: {response}
					})
	} catch (error) {
		
		yield put({
						type: LOAD_INSTAGRAM_ERROR,
						payload: {error}
					})
	}
}

export function * saga() {
	yield takeEvery(LOAD_INSTAGRAM_START, loadInstagramSaga);
}