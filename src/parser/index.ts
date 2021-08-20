import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'
import { evaluateHeader } from './evaluators'
import { extractHeader } from './extractor'

export async function parseHeader (filepath: string) {
  const buffer = await fs.readFile(filepath)
  const content = buffer.toString()
  const extracted = extractHeader(content)
  if (extracted === false) return false
  return evaluateHeader(extracted.header, filepath)
}

export async function checkHeader (filepath: string) {
  console.log(chalk.blue(`Checking header for ${path.basename(filepath)}`))
  let buffer: Buffer
  try {
    buffer = await fs.readFile(filepath)
  } catch (e) {
    console.log(chalk.red('Error reading file'))
    console.log(e)
    return
  }
  const content = buffer.toString()
  const extracted = extractHeader(content, true)
  if (extracted === false) {
    console.log(chalk.red('No valid header found'))
    return
  }
  const result = evaluateHeader(extracted.header, filepath, true)
  if (result === false) {
    console.log(chalk.red('Header cannot be evaluated'))
    return
  }
  console.dir(result)
}
