import {appName} from '../config'
import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
 

// Constants

export const moduleName = 'fullAssortiment'
const prefix = `${appName}/${moduleName}`
export const LOAD_FULL_ASSORTIMENT_START = `${prefix}/LOAD_FULL_ASSORTIMENT_START`
export const LOAD_FULL_ASSORTIMENT_SUCCESS = `${prefix}/LOAD_FULL_ASSORTIMENT_SUCCESS`
export const LOAD_FULL_ASSORTIMENT_ERROR = `${prefix}/LOAD_FULL_ASSORTIMENT_ERROR`


// Reducer

const ReducerState = Record({
	entities: Map(),
	error: null,
	loading: true
})

export default function reducer(state = new ReducerState(), action) {
	const {type, payload} = action

	switch(type){
		case LOAD_FULL_ASSORTIMENT_SUCCESS:
	 		return state
	 						.setIn(['entities'], payload.response)
	 		 				.setIn(['loading'], false)
	 			
		case LOAD_FULL_ASSORTIMENT_ERROR:	
	 		return state
	 						.setIn(['error'], payload.error)
	 						.setIn(['loading'], false)
	}

	return state
}


// Action Creators

export function loadFullAssortiment(id){
	return {
		type: LOAD_FULL_ASSORTIMENT_START,
		payload:{ id: id }
	}
}


//Sagas

export function * fullAssortimentSaga(action){
	try {
		const response = yield call(axios.get, `/wp-json/wp/v2/posts/${action.payload.id}`)

		yield put({
						type: LOAD_FULL_ASSORTIMENT_SUCCESS,
						payload: {response}
					})
	} catch (error) {
		
		yield put({
						type: LOAD_FULL_ASSORTIMENT_ERROR,
						payload: {error}
					})
	}
}

export function * saga() {
	yield takeEvery(LOAD_FULL_ASSORTIMENT_START, fullAssortimentSaga)
}