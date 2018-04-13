import {appName} from '../config'
import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
 

// Constants

export const moduleName = 'socialFooter'
const prefix = `${appName}/${moduleName}`
export const LOAD_SOCIAL_FOOTER_START = `${prefix}/LOAD_SOCIAL_FOOTER_START`
export const LOAD_SOCIAL_FOOTER_SUCCESS = `${prefix}/LOAD_SOCIAL_FOOTER_SUCCESS`
export const LOAD_SOCIAL_FOOTER_ERROR = `${prefix}/LOAD_SOCIAL_FOOTER_ERROR`


// Reducer
const ReducerState = Record({
	entities: Map(),
	loading: true,
	error: null
})

export default (state = new ReducerState(), action) => {
	const {type, payload, error} = action;
			
	switch (type) {
		case LOAD_SOCIAL_FOOTER_SUCCESS:


		 	return state
		 					.setIn(['loading'], false)
		 					.setIn(['entities'], payload.response.data)
			
		case LOAD_SOCIAL_FOOTER_ERROR:
			return state
							.setIn(['loading'], false)
							.setIn(['error'], error)
	}
	
	return state;
}

// Action Creators

export function loadSocialFooter(){
	return {
		type: LOAD_SOCIAL_FOOTER_START
	}
}

//Sagas

export function * socialFooterSaga(action){

	try {
		const response = yield call(axios.get, `/wp-json/menus/social_footer/menu`)

		yield put({
						type: LOAD_SOCIAL_FOOTER_SUCCESS,
						payload: {response}
					})
	} catch (error) {
		
		yield put({
						type: LOAD_SOCIAL_FOOTER_ERROR,
						payload: {error}
					})
	}
}

export function * saga() {
	yield takeEvery(LOAD_SOCIAL_FOOTER_START, socialFooterSaga)
}