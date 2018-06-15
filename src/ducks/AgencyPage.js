import {appName, LONG} from '../config'
import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
import {arrToMap} from './utils'
import {AGENCY_PAGE_ru, AGENCY_PAGE_en} from '../config'

 

// Constants

export const moduleName = 'AgencyPage'
const prefix = `${appName}/${moduleName}`
export const LOAD_AGENCY_PAGE_START = `${prefix}/LOAD_AGENCY_PAGE_START`
export const LOAD_AGENCY_PAGE_SUCCESS = `${prefix}/LOAD_AGENCY_PAGE_SUCCESS`
export const LOAD_AGENCY_PAGE_ERROR = `${prefix}/LOAD_AGENCY_PAGE_ERROR`


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
	error: null,
	loading: true
})

export default function reducer(state = new ReducerState(), action) {
	const {type, payload} = action

	switch(type){
		case LOAD_AGENCY_PAGE_SUCCESS:
			return state
							.set('entities', payload.response.data)
	 		 				.setIn(['loading'], false)
 			
		case LOAD_AGENCY_PAGE_ERROR:
	 		return state
	 						.setIn(['error'], payload.error)
	 						.setIn(['loading'], false)
	}

	return state
}


// Action Creators

export function loadAgencyPage(lang){
	return {
		type: LOAD_AGENCY_PAGE_START,
		payload: {lang}
	}
}

//Sagas

export function * agencyPageSaga(action){

	try {
		const articleLang = action.payload.lang == 'ru' ? AGENCY_PAGE_ru : AGENCY_PAGE_en;	
		
		const response = yield call(axios.get, `/wp-json/wp/v2/posts/${articleLang}`);
		console.log('response',response);
		yield put({
						type: LOAD_AGENCY_PAGE_SUCCESS,
						payload: {response}
					})
	} catch (error) {
		
		yield put({
						type: LOAD_AGENCY_PAGE_ERROR,
						payload: {error}
					})
	}
}

export function * saga() {
	yield takeEvery(LOAD_AGENCY_PAGE_START, agencyPageSaga)
}

