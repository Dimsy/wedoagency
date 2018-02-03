import {appName, LONG} from '../config'
import {Seq, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
import {arrToSet} from './utils'
 

// Constants

export const moduleName = 'news'
const prefix = `${appName}/${moduleName}`
export const LOAD_NEWS_START = `${prefix}/LOAD_NEWS_START`
export const LOAD_NEWS_SUCCESS = `${prefix}/LOAD_NEWS_SUCCESS`
export const LOAD_NEWS_ERROR = `${prefix}/LOAD_NEWS_ERROR`
export const TOGGLE_OPEN_NEWS = `${prefix}/TOGGLE_OPEN_NEWS`

// Reducer

const NewsModel = Record({
	'id': null,
	'content': null,
	'date': null,
	'title': null, 
	'acf': null
})

const ReducerState = Record({
	'entities': Seq({}),
	'isOpen': false,
	'loading': true,
	'error': false
})

export default function reducer(state = new ReducerState(), action) {
	const {type, payload} = action

	switch(type){
		case LOAD_NEWS_SUCCESS:
	 		return state
	 						.setIn(['entities'], arrToSet(payload.response.data, NewsModel))
	 		 				.setIn(['loading'], false)
	 			
		case LOAD_NEWS_ERROR:
	 		return state
	 						.setIn(['error'], payload.error)
	 						.setIn(['loading'], false)
	 	
	 	case TOGGLE_OPEN_NEWS:
			return state.setIn(['isOpen'], !state.isOpen) 
	}

	return state
}


// Action Creators


export function loadNews(categoryId, size){
	return {
		type: LOAD_NEWS_START,
		payload: {categoryId, size}
	}
}

export function toggleNews(){
	return {
		type: TOGGLE_OPEN_NEWS
	}
}





//Sagas

export function * newsSaga(action){

	try {
		const response = yield call(axios.get, `/wp-json/wp/v2/posts?categories=${action.payload.categoryId}&oredrby=date&per_page=${LONG}`)

		yield put({
						type: LOAD_NEWS_SUCCESS,
						payload: {response}
					})
	} catch (error) {
		
		yield put({
						type: LOAD_NEWS_ERROR,
						payload: {error}
					})
	}
}

export function * saga() {
	yield takeEvery(LOAD_NEWS_START, newsSaga)
}