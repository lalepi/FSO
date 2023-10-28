const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (blog.title === undefined || blog.url === undefined) {
        response.status(400).json(blog)
    } else {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    }
})

module.exports = blogsRouter