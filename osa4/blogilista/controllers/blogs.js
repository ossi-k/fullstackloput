const blogsRouter = require('express').Router()
//const { response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', {username : 1, name : 1, id : 1})
    response.json(blogs.map(blog => blog.toJSON()))
})

console.log('tapahtuuko mitään?')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    console.log('authorization ' + authorization)
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

blogsRouter.post('/', async (request, response) => {

    const body = request.body
    const token = getTokenFrom(request)
    console.log("token: " + token)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid'})
    }

    console.log('body on: ' + body)
    console.log('bodyn title: ' + body.title)
    console.log('bodyn user: ' + body.user)
    console.log('bodyn userid: ' + body.userid)

    const user = await User.findById(decodedToken.id)

    if (body.likes === '') {
        body.likes = '0'
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    if (blog.title === '' || blog.url === '') {
        response.status(400).end()
    } else {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON)
    }

    /*const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog,_id)
    response.json(savedBlog.toJSON)*/

})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter