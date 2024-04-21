import { React, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'

import { createBlog } from '../reducers/blogReducer'

import { Typography } from '@mui/material'

const Blog = () => {
    const blogFormRef = createRef()
    const dispatch = useDispatch()

    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        dispatch(createBlog(blogObject))
    }

    const sortBlogs = () => {
        const blogs = useSelector((state) => state.blogs)
        const temp = [...blogs]
        return temp.sort((a, b) => {
            if (a.likes < b.likes) return 1
            if (a.likes > b.likes) return -1
            return 0
        })
    }
    const blogForm = () => (
        <div>
            <Togglable
                buttonLabel="Create new blog"
                buttonLabelBack="cancel"
                ref={blogFormRef}
            >
                <BlogForm createBlog={addBlog} />
            </Togglable>
        </div>
    )

    return (
        <div>
            <Typography component="div" paddingLeft="15px" paddingTop="20px">
                {blogForm()}
            </Typography>

            <Typography variant="h6" paddingLeft="15px" paddingTop="20px">
                Blogs
            </Typography>

            <Typography component="div" paddingLeft="15px" paddingTop="20px">
                {sortBlogs().map((blog) => {
                    return (
                        <div key={blog.id}>
                            <Link to={`/blogs/${blog.id}`}>
                                {blog.title}
                                {blog.author}
                            </Link>
                        </div>
                    )
                })}
            </Typography>
        </div>
    )
}

export default Blog
