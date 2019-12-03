import {appName} from '../config'
import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
import {KIDS_INFO_ru, KIDS_INFO_en} from '../config'

 

// Constants

export const moduleName = 'kids'
const prefix = `${appName}/${moduleName}`
export const LOAD_KIDS_START = `${prefix}/LOAD_KIDS_START`
export const LOAD_KIDS_SUCCESS = `${prefix}/LOAD_KIDS_SUCCESS`
export const LOAD_KIDS_ERROR = `${prefix}/LOAD_KIDS_ERROR`


// Reducer

const ReducerState = Record({
    entities: new Map(),
	error: null,
	loading: true
})

export default function reducer(state = new ReducerState(), action) {
	const {type, payload} = action

	switch(type){
		case LOAD_KIDS_SUCCESS:
	 		return state
	 						.setIn(['entities'], payload.response.data)
	 		 				.setIn(['loading'], false)
	 			
		case LOAD_KIDS_ERROR:
	 		return state
	 						.setIn(['error'], payload.error)
	 						.setIn(['loading'], false)
	}

	return state
}


// Action Creators

export function loadKidsInfo(lang){
	return {
		type: LOAD_KIDS_START,
		payload: {lang}
	}
}


//Sagas

export function * loadKidsInfoSaga(action){
	//const articleLang = action.payload.lang == 'ru' ? KIDS_INFO_ru : KIDS_INFO_en;
	
	try {
		const response = yield call(axios.get, `https://wedoagency.ru/wp-json/wp/v2/posts/3177`)

		yield put({
						type: LOAD_KIDS_SUCCESS,
						payload: {response}
					})
	} catch (error) {
		
		yield put({
						type: LOAD_KIDS_ERROR,
						payload: {error}
					})
	}
}

export function * saga() {
	yield takeEvery(LOAD_KIDS_START, loadKidsInfoSaga);
}