const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.allBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.allBlogs.length)
})

test('blogs contain id field', async () => {

    const blogResponse = await api.get('/api/blogs')

    blogResponse.body.forEach(blog => {
        expect(blog.id).toBeDefined()
    })
})

test('a blog can be added', async () => {

    const newBlog = {
        title: 'Pet Cemetary',
        author: 'Stephen King',
        url: 'https://stephenking.com/',
        likes: 7,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.allBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain('Pet Cemetary')

})

test('likes field has value or it default to 0', async () => {

    const newBlog = {
        title: 'Pet Cemetary2',
        author: 'Stephen King',
        url: 'https://stephenking.com/',

    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogResponse = await api.get('/api/blogs')
    blogResponse.body.forEach(blog => {
        expect(blog.likes).toBeGreaterThanOrEqual(0)
    })
})



test('blog has no title, url field', async () => {

    const newBlog = {
        title: undefined,
        author: 'Stephen King',
        url: undefined,
        likes: 7,

    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const blogResponse = await api.get('/api/blogs')
    blogResponse.body.forEach(blog => {
        expect(blog.title).toBeTruthy()
        expect(blog.url).toBeTruthy()
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})

