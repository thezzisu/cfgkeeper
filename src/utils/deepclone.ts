import { deserialize, serialize } from 'v8'

export function deepclone<T> (S: T):T {
  return deserialize(serialize(S))
}
