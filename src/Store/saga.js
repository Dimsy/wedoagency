import {all} from 'redux-saga/effects'
import {saga as menuSaga} from '../ducks/menu'
import {saga as headerSaga} from '../ducks/header'
import {saga as awardsSaga} from '../ducks/awards'
import {saga as agencyInfoSaga} from '../ducks/agencyInfo';
import {saga as portfolioSaga} from '../ducks/portfolio';
import {saga as pressSaga} from '../ducks/press';
import {saga as pressPageSaga} from '../ducks/pressPage';
import {saga as pressListSaga} from '../ducks/pressList';
import {saga as newsSaga} from '../ducks/news';
import {saga as agencyPageSaga} from '../ducks/agencyPage';
import {saga as newsListSaga} from '../ducks/newsList';
import {saga as newsArticleSaga} from '../ducks/newsArticle';
import {saga as instagramSaga} from '../ducks/instagram';
import {saga as contsactsSaga} from '../ducks/contacts';
import {saga as socialFooterSaga} from '../ducks/socialFooter';
import {saga as formSaga} from '../ducks/form';



export default function * () {
	yield all([
		menuSaga(),
		awardsSaga(),
		headerSaga(),
		agencyInfoSaga(),
		portfolioSaga(),
		pressSaga(),
		pressListSaga(),
		pressPageSaga(),
		newsSaga(),
		newsListSaga(),
		newsArticleSaga(),
		contsactsSaga(),
		instagramSaga(),
		socialFooterSaga(),
		agencyPageSaga(),
		formSaga()
	])
} 