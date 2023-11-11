const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')
//const User = require('../models/user')
//const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)

})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body

    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // if (!decodedToken.id) {
    //     return response.status(401).json({ error: 'token invalid' })
    // }

    const user = request.user

    const blog = new Blog({

        title: body.title,
        author: body.author,
        url: body.url,
        user: user.id,
        likes: body.likes,
    })

    if (blog.title === undefined || blog.url === undefined) {
        response.status(400).json(blog)
    } else {

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog.id)
        await user.save()
        response.status(201).json(savedBlog)
    }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {

    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === user.id) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        return response.status(401).json({ error: 'operation permitted, only the owner of the blog is able to delete' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(201).json(body)
})


module.exports = blogsRouter