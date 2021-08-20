import { TemplateHeader } from '../header'
import Mustache from 'mustache'
import { globalMixin } from '../../helpers/global'

export function evaluateBody (content: string, header: TemplateHeader): string {
  const view = { }
  Object.assign(view, globalMixin)
  Object.assign(view, header.ctx)
  return Mustache.render(content, view)
}
