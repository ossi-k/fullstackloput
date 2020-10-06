const blogsRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')

/*blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs.map(blog => blog.toJSON()))
        })
})*/

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', (request, response) => {
    //const blog = new Blog(request.body)
    const body = request.body
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = blogsRouter