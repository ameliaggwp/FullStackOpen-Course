const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const helper = require("./test-helper")
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe("Blogs", () => {
  test("Total blogs equals correct amount of blogs in DB", async () => {
    const res = await api.get("/api/blogs")
    expect(res.body).toHaveLength(helper.initialBlogs.length)
  })

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("Unique identifier property of blog is named id", async () => {
    const res = await api.get("/api/blogs")

    expect(res.body[0].id).toBeDefined()
  })

  test("blog is successfully created and added to database", async () => {
    const newBlog = {
      title: "BTS sweeps Melon Charts",
      author: "Lia D",
      url: "www.btsblog.com",
      likes: 1000000,
    }

    await api.post("/api/blogs").send(newBlog).expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((b) => b.title)
    expect(titles).toContain("BTS sweeps Melon Charts")
  })
})
afterAll(() => {
  mongoose.connection.close()
})
