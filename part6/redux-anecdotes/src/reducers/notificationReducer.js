import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const notificationSlice = createSlice({
    name:'notification',
    initialState,
    reducers: {
    useNotification(state, action){
        return action.payload
    },
},

})

export const { useNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
    const notificationData = [content, time]
    return async dispatch => {
      dispatch(useNotification(notificationData))
      
    }
  }
export default notificationSlice.reducer