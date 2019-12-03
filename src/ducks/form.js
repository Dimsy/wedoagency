import {appName} from '../config'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
 

// Constants

export const moduleName = 'form'
const prefix = `${appName}/${moduleName}`
export const SEND_FORM_START = `${prefix}/SEND_FORM_START`
export const SEND_FORM_SUCCESS = `${prefix}/SEND_FORM_SUCCESS`
export const SEND_FORM_ERROR = `${prefix}/SEND_FORM_ERROR`


// Reducer

// Selectors

// Action Creators

export function sendForm(values){
	return {
		type: SEND_FORM_START,
		payload: {values}
	}
}

export function sendCustomForm(data) {
    axios
        .post('/wp-admin/admin-post.php', data)
        .then(function (response) {
        })
        .catch(function (error) {
        });
}


//Sagas

export function * sendFromSaga(action){

	try {
		const response = yield call(axios.post, '/wp-admin/admin-post.php', action.payload.values)

		yield put({
						type: SEND_FORM_SUCCESS,
						payload: {response}
					})
	} catch (error) {
		
		yield put({
						type: SEND_FORM_ERROR,
						payload: {error}
					})
	}
}

export function * saga() {
	yield takeEvery(SEND_FORM_START, sendFromSaga)
}