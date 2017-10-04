import React from 'react'
import ReactDOM from 'react-dom'
import logger from 'redux-logger'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import App from './App'

import reducer from './reducers/reducers'

const store = createStore(reducer, applyMiddleware(thunk, logger))

const container = document.querySelector('#root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, container
)
