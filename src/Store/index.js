import {createStore, applyMiddleware} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import saga from './saga'
import reduser from './reducer'
import history from '../history' 

const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(routerMiddleware(history), sagaMiddleware)

const store = createStore(reduser, {}, enhancer)
sagaMiddleware.run(saga)

//dev only!
window.store = store

export default store