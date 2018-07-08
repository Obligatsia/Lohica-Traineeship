import { combineReducers } from 'redux'
import value from './Value'
import friends from './Friends'

export default combineReducers ({
  user: value,
    friends: friends
})
