const lodash = require('lodash')
const blog = require('../models/blog')

const dummy = (blogs) => {
    return 1
}

const totalLikes = array => {
    const reducer = (sum, item) => {
      return sum + item.likes
    }
    return array.length === 0
      ? 0 
      : array.reduce(reducer, 0)
  }

const favouriteBlog = array => {
    max = 0
    fav = array[0]
    for (i = 1; i < array.length; i++) {
        if(array[i].likes > max) {
            fav = array[i]
            max = array[i].likes
        }
    }
    return fav.title + ", " + fav.author + ", " + fav.likes
}

/*const mostBlogs = array => {
    let authorsAndBlogs = lodash.countBy(array, (blogs) => blog.author)
    let max = 0
    let theMan = ""
    for(i = 0; i < authorsAndBlogs.lengt; i++) {
        currentAuthor = authorsAndBlogs[i]
        value = authorsAndBlogs[i].value
        if (value > max) {
           author = currentAuthor
           max = value 
        }
    }
    return theMan + " " + value
}*/

/*const mostBlogs = array => {

    let authorsAndBlogs = new Map()

    for (i = 0; i < array.length; i++) {
        if (array[i].author in authorsAndBlogs) {
            value = authorsAndBlogs.get(array[i].author) + 1
            authorsAndBlogs[array[i].author].set(value)
        } else {
            authorsAndBlogs[array[i].author].set(1)
        }
    }

    value = 0
    author = ""

    for (let [key, value] of authorsAndBlogs) {
        console.log("loop alkaa")
        if (value > highest) {
            highest = value
            console.log("value " + value)
            console.log("highest " + highest)
            author = key
            console.log("author " + author)
            console.log("key " + key)
        }
    }

    return "author: " + author + " blogs: " + value
}*/


module.exports = {
    totalLikes,
    dummy,
    favouriteBlog
}