import { Static, Type } from '@sinclair/typebox'
import Ajv from 'ajv'

export const TemplateHeaderSchema = Type.Object({
  dst: Type.String(),
  ctx: Type.Object({})
}, { additionalProperties: false })

export type TemplateHeader = Static<typeof TemplateHeaderSchema>

const ajv = new Ajv()
const validate = ajv.compile(Type.Strict(TemplateHeaderSchema))

export function isTemplateHeader (obj: any): obj is TemplateHeader {
  return validate(obj)
}
