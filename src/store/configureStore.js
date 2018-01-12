import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../reducers'

const getProdStore = initialState => (
  createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  )
)

const getDevStore = initialState => (
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunk)
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
