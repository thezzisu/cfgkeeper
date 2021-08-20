import chalk from 'chalk'
import { existsSync, readFileSync } from 'fs'

function parseOSReleaseFile (content: string) {
  const entries = content.split('\n').map(x => x.trim().split('=') as [string, string]).filter(x => x.length === 2)
  const map = new Map<string, string>(entries)
  return {
    id: map.get('ID'),
    name: map.get('NAME'),
    version: map.get('VERSION')
  }
}

export function getDistro () {
  if (process.platform === 'linux' && existsSync('/etc/os-release')) {
    try {
      const content = readFileSync('/etc/os-release').toString()
      return parseOSReleaseFile(content)
    } catch (e) {
      console.log(chalk.yellow('Warning: cannot read /etc/os-release'))
      console.log(e)
      return {}
    }
  } else {
    return {}
  }
}
