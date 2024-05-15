const { test } = require('node:test')
const assert = require('node:assert')

const { reverse } = require('../utils/forTesting.js')


test("First Testing reverse function", () => {
    const result = reverse("a")

    assert.strictEqual(result, "a")
})


test("Second Testing reverse function", () => {
    const result = reverse("Conocimiento")

    assert.strictEqual(result, "otneimiconoC")
})

test("Fail Testing reverse function", () => {
    const result = reverse("react")

    assert.strictEqual(result, "tcaer")
})