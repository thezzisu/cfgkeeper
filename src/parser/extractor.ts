export type TExtractResult = {
  header: string
  body: string
} | false

/**
 * Parse header wrapped in /*! script *!\/ format
 * @param content
 */
function extractHeaderCLikeMultiLines (content: string, verbose?: boolean): TExtractResult {
  const end = content.indexOf('!*/')
  if (end === -1) {
    verbose && console.log('Invalid /*! !*/ style header')
    return false
  }
  const header = content.substring(3, end).trim()
  const bs = content.indexOf('\n', end + 3)
  const body = content.substring(bs + 1)
  return { header, body }
}

/**
 * Parse header wrapped in //! script format
 * @param content
 */
function extractHeaderCLike (content: string, verbose?: boolean): TExtractResult {
  const lines = content.split('\n')
  const header: string[] = []
  const body: string[] = []
  let flag = true
  for (const line of lines) {
    if (flag && line.startsWith('//!')) {
      header.push(line.substring(3))
    } else {
      flag = false
      body.push(line)
    }
  }
  return {
    header: header.join('\n').trim(),
    body: body.join('\n')
  }
}

/**
 * Parse header wrapped in ##! script format
 * @param content
 */
function extractHeaderShLike (content: string, verbose?: boolean): TExtractResult {
  const lines = content.split('\n')
  const header: string[] = []
  const body: string[] = []
  let flag = true
  for (const line of lines) {
    if (flag && line.startsWith('##!')) {
      header.push(line.substring(3))
    } else {
      flag = false
      body.push(line)
    }
  }
  return {
    header: header.join('\n').trim(),
    body: body.join('\n')
  }
}

export function extractHeader (content: string, verbose?: boolean): TExtractResult {
  content = content.trimLeft()
  if (content.startsWith('/*!')) {
    verbose && console.log('Detected /*! !*/ style header')
    return extractHeaderCLikeMultiLines(content, verbose)
  }
  if (content.startsWith('//!')) {
    verbose && console.log('Detected //! style header')
    return extractHeaderCLike(content, verbose)
  }
  if (content.startsWith('##!')) {
    verbose && console.log('Detected ##! style header')
    return extractHeaderShLike(content, verbose)
  }
  verbose && console.log('No header detected')
  return false
}
