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

afterAll(() => {
  mongoose.connection.close()
})
