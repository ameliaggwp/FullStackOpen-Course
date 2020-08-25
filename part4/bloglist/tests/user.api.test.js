const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const User = require("../models/user")
const testhelper = require("./test-helper")
const helper = require("../utils/list_helper")
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

describe("Users", () => {
  test("Total users equals correct amount of users in DB", async () => {
    const res = await api.get("/api/users")
    expect(res.body).toHaveLength(0)
  })

  test("invalid user is not created", async () => {
    const newUser = {
      username: "testuser",
      name: "Lia Bear",
      password: "op",
    }

    await api.post("/api/users").send(newUser).expect(400)
    const res = await api.get("/api/users")
    expect(res.body).toHaveLength(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
