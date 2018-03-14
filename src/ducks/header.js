import {appName} from '../config'
import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
import {HEADER} from '../config'

 

// Constants

export const moduleName = 'header'
const prefix = `${appName}/${moduleName}`
export const LOAD_HEADER_START = `${prefix}/LOAD_HEADER_START`
export const LOAD_HEADER_SUCCESS = `${prefix}/LOAD_HEADER_SUCCESS`
export const LOAD_HEADER_ERROR = `${prefix}/LOAD_HEADER_ERROR`


// Reducer

const ReducerState = Record({
	entities: new Map(),
	error: null,
	loading: true
})

export default function reducer(state = new ReducerState(), action) {
	const {type, payload} = action

	switch(type){
		case LOAD_HEADER_SUCCESS:
	 		return state
	 						.setIn(['entities'], payload.response.data)
	 		 				.setIn(['loading'], false)
	 			
		case LOAD_HEADER_ERROR:
	 		return state
	 						.setIn(['error'], payload.error)
	 						.setIn(['loading'], false)
	}

	return state
}


// Action Creators

export function loadHeader(lang){
	return {
		type: LOAD_HEADER_START,
		payload: {lang}
	}
}


//Sagas

export function * loadHeaderSaga(action){

	try {
		const response = yield call(axios.get, `/wp-json/wp/v2/posts/${HEADER}`)
		yield put({
						type: LOAD_HEADER_SUCCESS,
						payload: {response}
					})
	} catch (error) {
		yield put({
						type: LOAD_HEADER_ERROR,
						payload: {error}
					})
	}
}

export function * saga() {
	yield takeEvery(LOAD_HEADER_START, loadHeaderSaga);
}