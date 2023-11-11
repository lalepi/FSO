const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

const bcrypt = require('bcryptjs')
const User = require('../models/user')

let loggedInToken = ''

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.allBlogs)
    await User.deleteMany({})

    const saltRounds = 10

    const passwordHash = await bcrypt.hash('secretpassword', saltRounds)

    const user = new User({
        username: 'testuser',
        passwordHash
    })
    await user.save()


    const response = await api
        .post('/api/login')
        .send({
            username: 'testuser',
            password: 'secretpassword'
        })

    loggedInToken = response.body.token
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
        likes: 7
    }

    await api
        .post('/api/blogs')
        .set({ Authorization: `bearer ${loggedInToken}` })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.allBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain('Pet Cemetary')

})

test('adding a blog without a token', async () => {

    const newBlog = {
        title: 'Pet Cemetary',
        author: 'Stephen King',
        url: 'https://stephenking.com/',
        likes: 7
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

    const blogResponse = await api.get('/api/blogs')
    blogResponse.body.forEach(blog => {
        expect(blog.title).toBeTruthy()
        expect(blog.url).toBeTruthy()
    })
})

test('likes field has value or it default to 0', async () => {

    const newBlog = {
        title: 'Pet Cemetary2',
        author: 'Stephen King',
        url: 'https://stephenking.com/',

    }
    await api
        .post('/api/blogs')
        .set({ Authorization: `bearer ${loggedInToken}` })
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
        .set({ Authorization: `bearer ${loggedInToken}` })
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

    beforeEach(async () => {
        await Blog.deleteMany({})
        const user = await User.find({ username: 'testuser' })

        const newBlog = new Blog({
            title: 'Pet Cemetary',
            author: 'Stephen King',
            url: 'https://stephenking.com/',
            likes: 7,
            user: user[0]._id
        })
        await newBlog.save()

    })
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]


        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set({ Authorization: `bearer ${loggedInToken}` })
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            blogsAtStart.length - 1
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

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain('React patterns modified')

})

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newestUser = {
            username: 'mluukkailainen',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newestUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newestUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('expected `username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if username too short', async () => {

        const newUser = {
            username: 'os',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('is shorter than the minimum allowed length')

    })

    test('creation fails with proper statuscode and message if password too short', async () => {

        const newUser = {
            username: 'username',
            name: 'Superuser',
            password: 'sa',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Password is too short')

    })

})

afterAll(async () => {
    await mongoose.connection.close()
})

