const { test, describe } = require('node:test')
const assert = require('node:assert')

const { average } = require('../utils/forTesting.js')

describe("Testing Average", () => {

    test("first test", () => {
        const result = average([1])
        assert.strictEqual(result, 1)
    })


    test("zero test", () => {
        const result = average([])
        assert.strictEqual(result, 0)
    })

    test('of many is calculated right', () => {
        assert.strictEqual(average([1, 2, 3, 4, 5, 6]), 3.5)
    })

})