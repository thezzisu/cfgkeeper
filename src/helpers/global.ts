import os from 'os'
import { getDistro } from './os-release'

const system = {
  arch: os.arch(),
  hostname: os.hostname(),
  platform: os.platform(),
  distro: getDistro()
}

export const globalMixin = {
  system
}

Object.assign(global, globalMixin)
