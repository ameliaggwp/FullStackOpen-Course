const { totalLikes } = require("../utils/list_helper")

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

  test("of empty list is zero", () => {
    const blogs = []

    const result = totalLikes(blogs)
    expect(result).toBe(0)
  })

  test("of a bigger list is calculated right", () => {
    const biggerList = [
      {
        _id: "5f024b75e821582e24e26050",
        title: "BTS wins Grammy!",
        author: "Lia D",
        url: "www.btsblog.com",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5f024b75e821582e24e26059",
        title: "Beep Boopin",
        author: "Lia D",
        url: "www.forabetterlife.com",
        likes: 2,
        __v: 0,
      },
    ]

    const result = totalLikes(biggerList)
    expect(result).toBe(7)
  })
})
