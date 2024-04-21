const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate("comments", { comment: 1 })
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

blogsRouter.get('/:id/comments', async (request, response) => {
    const comment = await Blog.findById(request.params.id).populate("comments")
    if (comment) {
        response.json(comment)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', userExtractor, async (request, response) => {

    const body = request.body
    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user.id,
        likes: body.likes,
    })

    if (blog.title && blog.url) {
        console.log(request.token)
        if (!request.token) {
            response.status(401).json({ error: 'invalid token' })
        }
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog.id)
        await user.save()
        response.status(201).json(savedBlog)
    } else {
        response.status(400).json(blog)
    }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === user.id) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        return response.status(401).json({
            error: 'operation permitted, only the owner of the blog is able to delete',
        })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(201).json(body)
})

blogsRouter.post('/:id/comments', async (request, response) => {

    const body = request.body

    const blog = await Blog.findById(body.blog.id)

    const comment = new Comment({
        comment: body.comment,

    })
    console.log("comment", comment)
    if (comment) {
        const savedComment = await comment.save()
        blog.comments = blog.comments.concat(savedComment._id);
        await blog.save();
        response.status(201).json(savedComment.toJSON())
    }
})




module.exports = blogsRouter
