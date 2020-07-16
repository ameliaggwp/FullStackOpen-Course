const Blog = require("../models/blog")

const initialBlogs = [
  {
    title: "BTS wins Grammy!",
    author: "Lia D",
    url: "www.btsblog.com",
    likes: 9000,
  },
  {
    title: "Addicted to true crime podcasts",
    author: "Lia D",
    url: "www.myfavoritemurder.com",
    likes: 320,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}
module.exports = { initialBlogs, blogsInDb }
