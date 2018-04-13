import {appName} from '../config'
import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
import {AGENCY_INFO_ru, AGENCY_INFO_en} from '../config'

 

// Constants

export const moduleName = 'agencyInfo'
const prefix = `${appName}/${moduleName}`
export const LOAD_AGENCYINFO_START = `${prefix}/LOAD_AGENCYINFO_START`
export const LOAD_AGENCYINFO_SUCCESS = `${prefix}/LOAD_AGENCYINFO_SUCCESS`
export const LOAD_AGENCYINFO_ERROR = `${prefix}/LOAD_AGENCYINFO_ERROR`


// Reducer

const ReducerState = Record({
	entities: new Map(),
	error: null,
	loading: true
})

export default function reducer(state = new ReducerState(), action) {
	const {type, payload} = action

	switch(type){
		case LOAD_AGENCYINFO_SUCCESS:
	 		return state
	 						.setIn(['entities'], payload.response.data)
	 		 				.setIn(['loading'], false)
	 			
		case LOAD_AGENCYINFO_ERROR:
	 		return state
	 						.setIn(['error'], payload.error)
	 						.setIn(['loading'], false)
	}

	return state
}


// Action Creators

export function loadAgencyInfo(lang){
	return {
		type: LOAD_AGENCYINFO_START,
		payload: {lang}
	}
}


//Sagas

export function * loadAgencyInfoSaga(action){
	const articleLang = action.payload.lang == 'ru' ? AGENCY_INFO_ru : AGENCY_INFO_en;
	
	try {
		const response = yield call(axios.get, `/wp-json/wp/v2/posts/${articleLang}`)

		yield put({
						type: LOAD_AGENCYINFO_SUCCESS,
						payload: {response}
					})
	} catch (error) {
		
		yield put({
						type: LOAD_AGENCYINFO_ERROR,
						payload: {error}
					})
	}
}

export function * saga() {
	yield takeEvery(LOAD_AGENCYINFO_START, loadAgencyInfoSaga);
}