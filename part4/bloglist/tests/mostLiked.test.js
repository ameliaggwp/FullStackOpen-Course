const { favoriteBlog } = require("../utils/list_helper")

describe("favorite blog", () => {
  test("that the more liked of two blogs is returned", () => {
    const blogList = [
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

    const result = favoriteBlog(blogList)
    expect(result[0]).toEqual(blogList[0])
  })
})
