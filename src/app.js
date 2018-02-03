import React from 'react'
import {render} from 'react-dom'
import App from './components/App.js'
import store from './store'
import {Provider} from 'react-redux'
import '../css/style.css'

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('container')
)