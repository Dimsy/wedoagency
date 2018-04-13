import {loadVendorsSaga, loadVendors} from './vendors.js'
import {call, put} from 'redux-saga/effects'
import {VENDORS} from '../../config'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

if('Load a vendors', () => {
	const mock = MockAdapter(axios)
	const vendors = VENDORS

	const requestAction = loadVendors(vendors)

	const gen = loadVendorsSaga(requestAction)

	const {value} = gen.next()

	expect(value).toEqual(call(axios.get, `/wp-json/wp/v2/posts/${vendors}`))

})