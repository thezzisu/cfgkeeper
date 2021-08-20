import chalk from 'chalk'
import path from 'path'
import requireFromString from 'require-from-string'
import { isTemplateHeader } from '../header'

export function evaluateHeader (code: string, filepath: string, verbose?: boolean) {
  let result: any
  try {
    result = requireFromString(code, filepath)
  } catch (e) {
    if (verbose) {
      console.log(chalk.red(`Evaluation error for: ${path.basename(filepath)}`))
      console.log(e)
      console.log(chalk.red('Please check your header carefully!'))
    }
    return false
  }
  if (isTemplateHeader(result)) {
    return result
  } else {
    if (verbose) {
      console.log(chalk.red(`Evaluation error for: ${path.basename(filepath)}`))
      console.log(chalk.red('Invalid header'))
    }
    return false
  }
}
