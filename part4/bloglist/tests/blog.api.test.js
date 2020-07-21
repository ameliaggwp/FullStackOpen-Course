const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const helper = require("./test-helper")
const { initialBlogs, blogsInDb } = require("./test-helper")
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

  test("Missing likes property returns default value of 0", async () => {
    const newBlog = {
      title: "21 day leg challenge",
      author: "Lia D",
      url: "www.fitness.com",
    }

    await api.post("/api/blogs").send(newBlog).expect(200)

    const blog = await Blog.findOne({ title: "21 day leg challenge" })
    expect(blog.likes).toBe(0)
  })

  test("blog can be deleted by id", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
  })

  test("Missing title and url properties returns with status code 400", async () => {
    const badBlog = {
      author: "Lia D",
    }

    await api.post("/api/blogs").send(badBlog).expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})
afterAll(() => {
  mongoose.connection.close()
})
