import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import { initializeUsers } from '../reducers/userReducer'
const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],

    reducers: {
        updateVote(state, action) {
            const id = action.payload.id
            const updatedBlog = action.payload
            return state.map((blogs) => (blogs.id !== id ? blogs : updatedBlog))
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
        updateList(state, action) {
            const id = action.payload.id
            return state.filter((blog) => {
                blog.id !== id
            })
        },
    },
})

export const { appendBlog, setBlogs, updateVote, updateList, addComment } =
    blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (content) => {
    return async (dispatch) => {
        try {
            const newBlog = await blogService.create(content)
            dispatch(appendBlog(newBlog))
            dispatch(initializeBlogs())
            dispatch(initializeUsers())
            const message = `a new blog ${newBlog.title} by ${newBlog.author} added`
            const time = 5
            dispatch(setNotification(message, time))
        } catch (error) {
            const message = `blog info missing, fill all text fields`
            const time = 5
            dispatch(setNotification(message, time))
        }
    }
}

export const voteBlog = (content) => {
    const object = { ...content, likes: content.likes + 1 }
    return async (dispatch) => {
        try {
            const newBlog = await blogService.update(object)
            dispatch(updateVote(newBlog))
            const message = `You liked blog '${newBlog.title}' `
            const time = 2
            dispatch(setNotification(message, time))
        } catch (error) {
            const message = `cant vote, errormessage '${error.message}' `
            const time = 10
            dispatch(setNotification(message, time))
        }
    }
}

export const removeBlog = (blog) => {
    return async (dispatch) => {
        try {
            await blogService.remove(blog)
            dispatch(updateList(blog))
            dispatch(initializeBlogs())
            dispatch(initializeUsers())
            const message = `Blog '${blog.title} by ${blog.author}' has been removed`
            const time = 5
            dispatch(setNotification(message, time))
        } catch (error) {
            const message = `cant remove, errormessage '${error.message}' `
            const time = 10
            dispatch(setNotification(message, time))
        }
    }
}

export const createComment = (comment) => {
    return async (dispatch) => {
        try {
            await blogService.comment(comment)
            dispatch(initializeBlogs())
        } catch (error) {
            const message = error.response.data.error
            const time = 5
            dispatch(setNotification(message, time))
        }
    }
}

export default blogSlice.reducer
