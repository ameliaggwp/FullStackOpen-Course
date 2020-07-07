const { dummy, totalLikes } = require("../utils/list_helper")

test("dummy returns one", () => {
  const blogs = []

  const result = dummy(blogs)
  expect(result).toBe(1)
})

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5f024b75e821582e24e26050",
      title: "BTS wins Grammy!",
      author: "Lia D",
      url: "www.btsblog.com",
      likes: 9000,
      __v: 0,
    },
  ]

  test("when list has only one blog equals the likes of that", () => {
    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(9000)
  })
})
