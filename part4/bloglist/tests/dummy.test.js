const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

define
test("dummy returns one", () => {
  const blogs = []

  const result = dummy(blogs)
  expect(result).toBe(1)
})
