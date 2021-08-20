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

export interface ICKConfig {
  machines: ICKMachine[]
  users: ICKUser[]
}
