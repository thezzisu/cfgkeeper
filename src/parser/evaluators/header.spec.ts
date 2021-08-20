import { equal } from 'assert'
import path from 'path'
import { evaluateHeader } from './header'

const filepath = path.resolve(__dirname, '..', '..', '..', 'test', 'fixture', 'example.c')

const code1 = `
module.exports = require('./example.header')
`

const code2 = `
module.exports =
`

const result = require('../../../test/fixture/example.header.js')

describe('Header evaluator', () => {
  it('valid header', () => {
    equal(evaluateHeader(code1, filepath), result)
  })
  it('invalid header', () => {
    equal(evaluateHeader(code2, filepath), false)
  })
})
