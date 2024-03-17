const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

test('dummy returns one', () => {
    const result = listHelper.dummy(helper.emptyBlog)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(helper.emptyBlog)
        expect(result).toBe(0)
    })
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(helper.oneBlog)
        expect(result).toBe(7)
    })
    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(helper.allBlogs)
        expect(result).toBe(56)
    })
})

describe('favorite blog', () => {
    test('has the most likes', () => {
        const result = listHelper.favoriteBlog(helper.allBlogs)
        expect(result).toEqual({
            title: 'TDD harms architecture',
            author: 'Robert C. Martin',
            likes: 20,
        })
    })
})

describe('Most Blogs', () => {
    test('has the most blogs', () => {
        const result = listHelper.mostBlogs(helper.allBlogs)
        expect(result).toEqual({
            author: 'Robert C. Martin',
            blogs: 3,
        })
    })
})

describe('Most Likes', () => {
    test('has the most likes on blogs', () => {
        const result = listHelper.mostLikes(helper.allBlogs)
        expect(result).toEqual({
            author: 'Robert C. Martin',
            likes: 32,
        })
    })
})
