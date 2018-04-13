import {appName} from '../config'
import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
import {arrToOrderedMap} from './utils'
 

// Constants

export const moduleName = 'menu'
const prefix = `${appName}/${moduleName}`
export const LOAD_MENU_START = `${prefix}/LOAD_MENU_START`
export const LOAD_MENU_SUCCESS = `${prefix}/LOAD_MENU_SUCCESS`
export const LOAD_MENU_ERROR = `${prefix}/LOAD_MENU_ERROR`


// Reducer

const MenuModel = Record({
	'ID': null,
	'classes': null,
	'children': [],
	'menu_order': null,
	'title': null,
	'url': null
})

const ReducerState = Record({
	entities: Map(),
	loading: true,
	error: null
})

export default (state = new ReducerState(), action) => {
	const {type, payload, error} = action


			
	switch (type) {
		case LOAD_MENU_SUCCESS:
		 	return state
		 					.setIn(['loading'], false)
		 					.mergeIn(['entities'], arrToOrderedMap(payload.response.data, MenuModel))
			
		case LOAD_MENU_ERROR:
			return state
							.setIn(['loading'], false)
							.setIn(['error'], error)
	}
	
	return state
}

// Action Creators

export function loadMenu(lang){
	return {
		type: LOAD_MENU_START,
		payload: {lang}
	}
}

//Sagas

export function * menuSaga(action){

	try {
		const response = yield call(axios.get, `/wp-json/menus/topMenu_${action.payload.lang}/menu`)

		yield put({
						type: LOAD_MENU_SUCCESS,
						payload: {response}
					})
	} catch (error) {
		
		yield put({
						type: LOAD_MENU_ERROR,
						payload: {error}
					})
	}
}

export function * saga() {
	yield takeEvery(LOAD_MENU_START, menuSaga)
}