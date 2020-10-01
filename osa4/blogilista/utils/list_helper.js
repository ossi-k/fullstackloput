const dummy = (blogs) => {
    return 1
}

/* const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
    }
    return blogs.reduce(reducer, 0)
} */

const totalLikes = array => {
    const reducer = (sum, item) => {
      return sum + item.likes
    }
    return array.length === 0
      ? 0 
      : array.reduce(reducer, 0)
  }

module.exports = {
    totalLikes,
    dummy
}