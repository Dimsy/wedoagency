import {appName, LONG} from '../config'
import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
import {arrToMap} from './utils'
 

// Constants

export const moduleName = 'newsArticle'
const prefix = `${appName}/${moduleName}`
export const LOAD_NEWS_ARTICLE_START = `${prefix}/LOAD_NEWS_ARTICLE_START`
export const LOAD_NEWS_ARTICLE_SUCCESS = `${prefix}/LOAD_NEWS_ARTICLE_SUCCESS`
export const LOAD_NEWS_ARTICLE_ERROR = `${prefix}/LOAD_NEWS_ARTICLE_ERROR`


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
		case LOAD_NEWS_ARTICLE_SUCCESS:
			return state
							.set('entities', payload.response.data)
	 		 				.setIn(['loading'], false)
 			
		case LOAD_NEWS_ARTICLE_ERROR:
	 		return state
	 						.setIn(['error'], payload.error)
	 						.setIn(['loading'], false)
	}

	return state
}


// Action Creators

export function loadNewsArticleList(id){
	return {
		type: LOAD_NEWS_ARTICLE_START,
		payload: {id}
	}
}

//Sagas

export function * newsArticleSaga(action){

	try {
		
		const response = yield call(axios.get, `/wp-json/wp/v2/posts/${action.payload.id}`);
	
	
		yield put({
						type: LOAD_NEWS_ARTICLE_SUCCESS,
						payload: {response}
					})
	} catch (error) {
		
		yield put({
						type: LOAD_NEWS_ARTICLE_ERROR,
						payload: {error}
					})
	}
}

export function * saga() {
	yield takeEvery(LOAD_NEWS_ARTICLE_START, newsArticleSaga)
}

