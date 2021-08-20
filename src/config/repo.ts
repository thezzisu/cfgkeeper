import path from 'path'
import * as fs from 'fs-extra'

export interface ICKMachine {
  guid: string
  name: string
  extends: string
}

export interface ICKUser {
  guid: string
  name: string
  extends: string
}

export interface ICKRepoConfig {
  machines: ICKMachine[]
  users: ICKUser[]
}

export async function CKLoadRepoConfig (repoPath: string) {
  const configFile = path.resolve(repoPath, '.ckrc.js')
  if (await fs.pathExists(configFile)) {
    const config: ICKRepoConfig = require(configFile)
    return config
  } else {
    throw new Error('Repo config not found')
  }
}
