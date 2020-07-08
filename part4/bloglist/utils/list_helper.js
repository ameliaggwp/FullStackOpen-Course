const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (currentTopLikes, blog) => {
    return currentTopLikes > blog.likes ? currentTopLikes : blog.likes
  }
  const topLikes = blogs.reduce(reducer, 0)
  const topBlog = blogs.filter((b) => {
    return b.likes === topLikes
  })
  return topLikes === 0 ? "No likes available to compare" : topBlog
}

module.exports = { dummy, totalLikes, favoriteBlog }
