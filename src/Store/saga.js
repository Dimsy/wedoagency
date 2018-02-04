import {all} from 'redux-saga/effects'
import {saga as menuSaga} from '../ducks/menu'
import {saga as agencyInfoSaga} from '../ducks/agencyInfo';
import {saga as portfolioSaga} from '../ducks/portfolio';
import {saga as pressSaga} from '../ducks/press';
import {saga as newsSaga} from '../ducks/news';
import {saga as distribsSaga} from '../ducks/distribs'
import {saga as contsactsSaga} from '../ducks/contacts'


export default function * () {
	yield all([
		menuSaga(),
		agencyInfoSaga(),
		portfolioSaga(),
		pressSaga(),
		newsSaga(),
		contsactsSaga(),
		distribsSaga()
	])
} 