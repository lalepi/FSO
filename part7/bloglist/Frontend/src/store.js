import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import themeReducer from './reducers/themeReducer'
const store = configureStore({
    reducer:{
      blogs: blogReducer,
      notification: notificationReducer,
      login: loginReducer,
      users: userReducer,
      theme: themeReducer
    }
  })

  export default store