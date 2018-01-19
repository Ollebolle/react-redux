import { combineReducers } from 'redux'
import { items, itemsHasErrored, itemsIsLoading } from './items'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  items,
  itemsHasErrored,
  itemsIsLoading,
  router: routerReducer
})
