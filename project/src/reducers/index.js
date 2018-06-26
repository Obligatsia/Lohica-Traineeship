import { combineReducers } from 'redux'
import value from './Value'
import welcomeUser from './WelcomeUser'

export default combineReducers ({
  user: value,
    welcome: welcomeUser,
})
