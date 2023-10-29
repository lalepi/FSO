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

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.allBlogs.length - 1
        )

        const contents = blogsAtEnd.map(r => r.title)

        expect(contents).not.toContain(blogToDelete.title)
        expect(contents).not.toContain(blogToDelete.author)
        expect(contents).not.toContain(blogToDelete.url)
        expect(contents).not.toContain(blogToDelete.likes)

    })
})

test('modifying a blog', async () => {

    const blogsAtStart = await helper.blogsInDb()
    const blogToModify = blogsAtStart[0]

    const modBlog = {
        title: 'React patterns modified',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
    }

    await api
        .put(`/api/blogs/${blogToModify.id}`)
        .send(modBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const titles = await helper.blogsInDb().map(n => n.title)
    expect(titles).toContain('React patterns modified')

})


afterAll(async () => {
    await mongoose.connection.close()
})

