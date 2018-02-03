import {appName} from '../config'
import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
 

// Constants

export const moduleName = 'contacts'
const prefix = `${appName}/${moduleName}`
export const LOAD_CONTACTS_START = `${prefix}/LOAD_CONTACTS_START`
export const LOAD_CONTACTS_SUCCESS = `${prefix}/LOAD_CONTACTS_SUCCESS`
export const LOAD_CONTACTS_ERROR = `${prefix}/LOAD_CONTACTS_ERROR`


// Reducer

const ReducerState = Record({
	entities: Map(),
	error: null,
	loading: true
})

export default function reducer(state = new ReducerState(), action) {
	const {type, payload} = action

	switch(type){
		case LOAD_CONTACTS_SUCCESS:

	 		return state
	 						.setIn(['entities'], payload.response.data)
	 		 				.setIn(['loading'], false)
	 			
		case LOAD_CONTACTS_ERROR:	
	 		return state
	 						.setIn(['error'], payload.error)
	 						.setIn(['loading'], false)
	}

	return state
}


// Action Creators

export function loadContacts(id){
	return {
		type: LOAD_CONTACTS_START,
		payload: {id: id}
	}
}


//Sagas

export function * loadContactsSaga(action){
	try {
		const response = yield call(axios.get, `/wp-json/wp/v2/posts/${action.payload.id}`)

		yield put({
						type: LOAD_CONTACTS_SUCCESS,
						payload: {response}
					})
	} catch (error) {
		
		yield put({
						type: LOAD_CONTACTS_ERROR,
						payload: {error}
					})
	}
}

export function * saga() {
	yield takeEvery(LOAD_CONTACTS_START, loadContactsSaga)
}