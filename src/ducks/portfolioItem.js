import {appName} from '../config'
import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import {arrToMap} from './utils'
import axios from 'axios'


// Constants
export const moduleName = 'portfolioItem'
const prefix = `${appName}/${moduleName}`
export const LOAD_PORTFOLIO_ITEM_START = `${prefix}/LOAD_PORTFOLIO_ITEM_START`
export const LOAD_PORTFOLIO_ITEM_SUCCESS = `${prefix}/LOAD_PORTFOLIO_ITEM_SUCCESS`
export const LOAD_PORTFOLIO_ITEM_ERROR = `${prefix}/LOAD_PORTFOLIO_ITEM_ERROR`
var POST_COUNTER = 0;
const POSTS_STEP = 12;

// Reducer
const ReducerState = Record({
    error: null,
    loading: true,
    selectedPortfolio: null
})

export default function reducer(state = new ReducerState(), action) {
    const {type, payload} = action

    switch(type){
        case LOAD_PORTFOLIO_ITEM_SUCCESS:
            return state
                .set('selectedPortfolio', payload.isSlug ? payload.selectedPortfolio.data[0] : payload.selectedPortfolio.data)
                .set('loading', false)

        case LOAD_PORTFOLIO_ITEM_ERROR:
            return state
                .set('error', payload.error)
                .set('loading', false)
    }

    return state
}

export function loadPortfolioItem(id, isSlug){
    return {
        type: LOAD_PORTFOLIO_ITEM_START,
        payload: {id, isSlug}
    }
}



//Sagas
export function * loadPortfolioItemSaga(action){
    try {
        const matchUrl = action.payload.isSlug ? `/wp-json/wp/v2/posts?slug=${action.payload.id}` : `/wp-json/wp/v2/posts/${action.payload.id}`;
        const selectedPortfolio = yield call(axios.get, matchUrl);

        yield put({
            type: LOAD_PORTFOLIO_ITEM_SUCCESS,
            payload: {selectedPortfolio, isSlug: action.payload.isSlug}
        })
    } catch (error) {

        yield put({
            type: LOAD_PORTFOLIO_ITEM_ERROR,
            payload: {error}
        })
    }
}

export function * saga() {
    yield takeEvery(LOAD_PORTFOLIO_ITEM_START, loadPortfolioItemSaga);
}