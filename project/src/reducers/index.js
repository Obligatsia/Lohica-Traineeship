import { combineReducers } from 'redux'
import value from './Value'
import visibilityFilter from './visibilityFilter'


export default combineReducers ({
  userName: value,
  visibilityFilter
})
