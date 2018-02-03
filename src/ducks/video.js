import {appName} from '../config'
import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
import {PRESS_ru, PRESS_en} from '../config'

 

// Constants

export const moduleName = 'video'
const prefix = `${appName}/${moduleName}`
export const LOAD_PRESS_START = `${prefix}/LOAD_VIDEO_START`
export const LOAD_PRESS_SUCCESS = `${prefix}/LOAD_VIDEO_SUCCESS`
export const LOAD_PRESS_ERROR = `${prefix}/LOAD_VIDEO_ERROR`


// Reducer

const ReducerState = Record({
	entities: new Map(),
	error: null,
	loading: true
})

export default function reducer(state = new ReducerState(), action) {
	const {type, payload} = action;

	console.log("action", action.type);

	switch(type){
		case LOAD_PRESS_SUCCESS:
	 		return state
	 						.setIn(['entities'], payload.response)
	 		 				.setIn(['loading'], false)
	 			
		case LOAD_PRESS_ERROR:
	 		return state
	 						.setIn(['error'], payload.error)
	 						.setIn(['loading'], false)
	}

	return state
}


// Action Creators

export function loadPress(lang){
	return {
		type: LOAD_PRESS_START,
		payload: {lang}
	}
}


//Sagas

export function * loadPressSaga(action){
	const articleLang = action.payload.lang == 'ru' ? PRESS_ru : PRESS_en;

	try {
		const response = yield call(axios.get, `/wp-json/wp/v2/posts/${articleLang}`)

		yield put({
						type: LOAD_PRESS_SUCCESS,
						payload: {response}
					})
	} catch (error) {
		
		yield put({
						type: LOAD_PRESS_ERROR,
						payload: {error}
					})
	}
}

export function * saga() {
	yield takeEvery(LOAD_PRESS_START, loadPressSaga);
}