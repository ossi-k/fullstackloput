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

blogsRouter.post('/', async (request, response) => {
    //const blog = new Blog(request.body)
    const body = request.body
    if (body.likes === '') {
        body.likes = '0'
    }
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })
    /*
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })*/
    //const savedBlog = await blog.save()
    console.log("title " + blog.title)
    console.log("url " + blog.url)
    if (blog.title === '' || blog.url === '') {
        response.status(400).end()
    } else {
        const savedBlog = await blog.save()
        response.json(savedBlog.toJSON)
    }
    
})

module.exports = blogsRouter