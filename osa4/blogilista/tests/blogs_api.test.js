const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const { TestScheduler } = require('jest')
const Blog = require('../models/blog')
const blog = require('../models/blog')
const User = require('../models/user')

/* const initialBlogs = [
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
] */

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()

    await User.deleteMany({})
    const user = new User({ username: 'jebbe', password: 'passuwordu' })
    await user.save()
})

const api = supertest(app)

test('returns the correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('identification variable is named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
    expect(response.body[1].id).toBeDefined()
})

test('new blogs can be added', async () => {
    const userAtStart = await helper.usersInDb()
    const newBlog = {
        title: "jebbe jabbersonin elämä",
        author: "jebbe",
        url: "www.jebbe.jabbe",
        likes: "2",
        userid: userAtStart[0].id
        
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
        'jebbe jabbersonin elämä'
    )
})

test('empty likes is assigned value zero (0)', async () => {
    const userAtStart = await helper.usersInDb()
    const newBlog = {
        title: "no one likes me",
        author: "jebbe",
        url: "www.jebbe.jabbe",
        likes: "",
        userid: userAtStart[0].id
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(response.body[2].likes) === 0
})

test('no blogs with empty url and title can be added', async () => {
    const userAtStart = await helper.usersInDb()
    const newBlog = {
        title: "",
        author: "jebbe",
        url: "",
        likes: "5",
        userid: userAtStart[0].id
    }

    const newBlogNoTitle = {
        title: "",
        author: "jebbe",
        url: "www.jeemaali.y",
        likes: "5",
        userid: userAtStart[0].id
    }


    const newBlogNoTitleNoUrl = {
        title: "yykaakoo",
        author: "jebbe",
        url: "",
        likes: "5",
        userid: userAtStart[0].id
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .send(newBlogNoTitle)
        .send(newBlogNoTitleNoUrl)
        .expect(400)
})

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    console.log("eka blogi" + blogsAtStart[0].title)
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(
        helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
})

test('creation succeeds with a fresh username', async () => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
        username: 'tebster',
        name: 'Tebbo Teboil',
        password: 'thepassword'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(userAtStart.length + 1)

    const usernames = usersAtEnd.map(elUser => elUser.username)
    expect(usernames).toContain(newUser.username)
})

/*test('creation fails with proper statuscode and message if username is already taken', async () => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
        username: 'jebbe',
        name: 'theUser',
        password: 'salaisuus'
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(userAtStart.length)
})*/


afterAll(() => {
    mongoose.connection.close()
})