import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import storage from '../services/storage'
import{ setNotification} from './notificationReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: [],

  reducers: {
    setCredentials(state, action) {
      storage.saveUser(action.payload)
      return action.payload
      },
    removeCredentials(state, action) {
      storage.removeUser()
      return action.payload
      },
  },
})

export const {setCredentials, removeCredentials} = loginSlice.actions

export const loginCredentials = credentials => {
  return async dispatch => {

    try{
    const login = await loginService.login(credentials)
    dispatch(setCredentials(login))

    const message = (`welcome ${login.username}`)
    const time = 5
    dispatch(setNotification(message, time))
    }

    catch (error){
      const message = ("wrong username or password")
      const time = 5
      dispatch(setNotification(message, time))

    }
  }
}

export const logoutCredentials = () => {
  return async dispatch => {
    dispatch(removeCredentials())
    const message = (`goodbye`)
    const time = 5
    dispatch(setNotification(message, time))
    }
  }


export default loginSlice.reducer