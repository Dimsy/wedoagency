import {appName} from '../config'
import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
import {arrToMap} from './utils'

// Constants

export const moduleName = 'aromGroup'
const prefix = `${appName}/${moduleName}`
export const LOAD_AROM_GROUP_START = `${prefix}/LOAD_AROM_GROUP_START`
export const LOAD_AROM_GROUP_SUCCESS = `${prefix}/LOAD_AROM_GROUP_SUCCESS`
export const LOAD_AROM_GROUP_CAT_SUCCESS = `${prefix}/LOAD_AROM_GROUP_CAT_SUCCESS`
export const LOAD_AROM_GROUP_ERROR = `${prefix}/LOAD_AROM_GROUP_ERROR`
export const LOAD_AROM_GROUP_ERROR_CAT = `${prefix}/LOAD_AROM_GROUP_ERROR_CAT`



// Reducer

const AromTypeModel = Record({
	'id': null,
	'acf': {},
	'content': null,
	'title': null 
})

const ReducerState = Record({
	entities: new Map(),
	aromCatName: null,
	aromCat: null,
	loading: true,
	error: null
})

export default function reducer(state = new ReducerState(), action) {
	const {type, payload} = action

	switch(type){
	 	case LOAD_AROM_GROUP_CAT_SUCCESS:
	 		return state
	 						.setIn(['aromCatName'], payload.aromCatName)
	 						.setIn(['aromCat'], payload.aromCat)
	 						.setIn(['entities'], arrToMap(payload.response.data, AromTypeModel))
	 						.setIn(['loading'], false)
		
		case LOAD_AROM_GROUP_ERROR:
		console.log('error: ', payload)
	 		return state
	 						.setIn(['error'], payload.error)
	 						.setIn(['loading'], false)
	}

	return state
}


// Action Creators

export function loadAromType(category, aromCat){
	return {
		type: LOAD_AROM_GROUP_START,
		payload: {category, aromCat}
	}
}


//Sagas

export function *  loadAromGroupCatSaga(action){
	const aromCat = action.payload.aromCat
	const aromCatName = action.payload.response.data[0].name
	
	try {
		const response = yield call(axios.get, `/wp-json/wp/v2/posts?categories=${ action.payload.response.data[0].id}`)
	
		yield put({
		 				type: LOAD_AROM_GROUP_CAT_SUCCESS,
		 				payload: {response, aromCat, aromCatName}
		 			})
	} catch (error) {

		yield put({
						type: LOAD_AROM_GROUP_ERROR,
						payload: {error}
					})
	}
}




export function * loadAromGroupSaga(action){
	const aromCat = action.payload.aromCat

	try {
		const response = yield call(axios.get, `/wp-json/wp/v2/categories?parent=${action.payload.category}&slug=${aromCat}`)
														
		yield put({
		 				type: LOAD_AROM_GROUP_SUCCESS,
		 				payload: {response, aromCat}
		 			})

	} catch (error) {
		
		yield put({
						type: LOAD_AROM_GROUP_ERROR,
						payload: {error}
					})
	}
}

export function * saga() {
	yield takeEvery(LOAD_AROM_GROUP_START, loadAromGroupSaga)
	yield takeEvery(LOAD_AROM_GROUP_SUCCESS, loadAromGroupCatSaga)
}