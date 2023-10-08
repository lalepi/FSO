const _ = require('lodash')

const dummy = (blogs) => {
    console.log(blogs)
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((likes, count) => likes + count.likes, 0)

    return total
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((prev, current) => prev.likes > current.likes ? prev : current)

    const mostLiked = {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
    console.log(mostLiked)

    return (mostLiked)

}

const mostBlogs = (blogs) => {

    const blogCount = Object.entries(blogs.reduce((acc, { author }) => {
        acc[author] = (acc[author] || 0) + 1
        return acc
    }, {})).map(([k, v]) => ({ author: k, blogs: v }))


    const mostAmount = _.reduce(blogCount, (prev, current) => prev.blogs > current.blogs ? prev : current)

    return (mostAmount)
}

const mostLikes = (blogs) => {
    const likeCount = Object.entries(blogs.reduce((acc, { author, likes }) => {
        acc[author] = (acc[author] || 0) + _.add(likes)
        return acc

    }, {})).map(([k, v]) => ({ author: k, likes: v }))

    const mostAmount = _.reduce(likeCount, (prev, current) => prev.likes > current.likes ? prev : current)
    return (mostAmount)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}

