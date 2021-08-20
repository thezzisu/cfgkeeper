import { equal } from 'assert'
import path from 'path'
import { parseHeader } from './index'

const base = path.resolve(__dirname, '..', '..', 'test', 'fixture')
const result = require(path.join(base, 'example.header.js'))

describe('Parse header', () => {
  it('valid header', async () => {
    equal(await parseHeader(path.join(base, 'example.c')), result)
  })
  it('invalid header', async () => {
    equal(await parseHeader(path.join(base, 'example1.c')), false)
  })
})
