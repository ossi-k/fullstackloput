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


module.exports = {
    totalLikes,
    dummy,
    favouriteBlog
}