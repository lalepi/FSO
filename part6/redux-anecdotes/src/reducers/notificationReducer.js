import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name:'notification',
    initialState,
    reducers: {
    setNotification(state, action){
        const content = action.payload
        return content
    },
    hideNotification(state, action){
        return action.payload
    }
},

})

export const { setNotification, hideNotification } = notificationSlice.actions

export default notificationSlice.reducer