import {appName} from '../config'
import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
import {PRESS_ru, PRESS_en} from '../config'
import {PRESS_LIST_ru, PRESS_LIST_en} from '../config';

 

// Constants

export const moduleName = 'press'
const prefix = `${appName}/${moduleName}`
export const LOAD_PRESS_START = `${prefix}/LOAD_PRESS_START`
export const LOAD_PRESS_SUCCESS = `${prefix}/LOAD_PRESS_SUCCESS`
export const LOAD_PRESS_ERROR = `${prefix}/LOAD_PRESS_ERROR`


// Reducer

const ReducerState = Record({
	entities: new Map(),
	error: null,
	loading: true
})

export default function reducer(state = new ReducerState(), action) {
	const {type, payload} = action;

	switch(type){
		case LOAD_PRESS_SUCCESS:
	 		return state
	 						.setIn(['entities'], payload.resp)
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
    const pressListLang = action.payload.lang == 'ru' ? PRESS_LIST_ru : PRESS_LIST_en;

	try {
		const response = yield call(axios.get, `/wp-json/wp/v2/posts/${articleLang}`)
        const pressListResponse = yield call(axios.get, `/wp-json/wp/v2/posts?categories=${pressListLang}&orderby=date&order=desc&per_page=9&offset=0`);

		const resp = {
			response: response.data,
			pressList: pressListResponse.data
		}

		yield put({
						type: LOAD_PRESS_SUCCESS,
						payload: {resp}
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