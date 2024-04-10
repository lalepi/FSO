import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

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
            console.log('action.payload', action.payload)
            const id = action.payload.id
            const blogs = state.filter((blog) => {
                return blog.id !== id
            })
            console.log(blogs)
            return blogs
        },
    },
})

export const { appendBlog, setBlogs, updateVote, updateList } =
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

export const removeBlog = (content) => {
    console.log('content', { ...content })
    const blog = { ...content }
    return async (dispatch) => {
        try {
            await blogService.remove(blog)
            dispatch(updateList(blog))
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

export default blogSlice.reducer
