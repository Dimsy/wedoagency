import {appName} from '../config'


// Constants

export const moduleName = 'lang'
const prefix = `${appName}/${moduleName}`
export const CHANGE_LANGUAGE_RU = `${prefix}/CHANGE_LANGUAGE_RU`;
export const CHANGE_LANGUAGE_EN = `${prefix}/CHANGE_LANGUAGE_EN`;


// Reducer

const ReducerState = {
	useLang: "ru"
}


export default function reducer(state = ReducerState, action) {
	const {type} = action

	switch(type){
		case CHANGE_LANGUAGE_RU:
	 		return Object.assign({}, state, {
	 			useLang: "ru"
	 		})
	 						
	 			
		case CHANGE_LANGUAGE_EN:
	 		return Object.assign({}, state, {
	 			useLang: "en"
	 		})
	}

	return state
}


// Action Creators

export function changeLangRu(id){
	return {
		type: CHANGE_LANGUAGE_RU
	}
}

export function changeLangEn(id){
	return {
		type: CHANGE_LANGUAGE_EN
	}
}

