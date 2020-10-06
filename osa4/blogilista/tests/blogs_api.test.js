const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { TestScheduler } = require('jest')
const Blog = require('../models/blog')
const blog = require('../models/blog')

const initialBlogs = [
    {
        title: "the testbois",
        author: "Snout Cougar",
        url: "www.tpaioo.com",
        likes: "2"
    },
    {
        title: "j-way",
        author: "j-boi",
        url: "www.cheesyjay.com",
        likes: "5"
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

const api = supertest(app)

test('returns the correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
}) 

test('identification variable is named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
    expect(response.body[1].id).toBeDefined()
})

test('new blogs can be added', async () => {
    const newBlog = {
        title: "jebbe jabbersonin elämä",
        author: "jebbe",
        url: "www.jebbe.jabbe",
        likes: "2"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain(
        'jebbe jabbersonin elämä'
    )
})

afterAll(() => {
    mongoose.connection.close()
})