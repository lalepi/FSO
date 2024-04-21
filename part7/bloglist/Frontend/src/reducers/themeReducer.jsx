import { createSlice } from '@reduxjs/toolkit'

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        value: '',
    },
    reducers: {
        setTheme: (state, action) => {
            console.log('action', action.payload)
            state.value = action.payload
        },
        resetTheme: (state) => {
            state.value = ''
        },
    },
})

export const { setTheme, resetTheme } = themeSlice.actions

export default themeSlice.reducer
