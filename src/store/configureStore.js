import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { createLogger } from 'redux-logger'

import rootReducer from '../reducers'

export const history = createHistory()
const routeMiddleware = routerMiddleware(history)

const logger = createLogger({
  collapsed: true
})

const getProdStore = initialState => (
  createStore(
    combineReducers({
      rootReducer,
      router: routerReducer
    }),
    initialState,
    applyMiddleware(
      thunk,
      routeMiddleware
    )
  )
)

const getDevStore = initialState => (
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        logger,
        thunk,
        routeMiddleware
      )
    )
  )
)

export default function configureStore(initialState) {
  const store = module.hot ? getDevStore(initialState) : getProdStore(initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
