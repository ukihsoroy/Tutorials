const fs = require('fs')
const path = require('path')
const mime = require('mime')

function toBase64 (dirname, value, inlineImageMaxSize = 10000) {
  const filePath = path.join(dirname, value)

  let content
  try {
    content = fs.readFileSync(filePath)
  } catch (e) {
    console.warn(`${filePath} 不存在!`)
  }

  if (!content) return value
  if (content.length > inlineImageMaxSize) return value

  const mimetype = mime.getType(filePath)
  return `data:${mimetype || ''};base64,${content.toString('base64')}`
}

function inlineImageFromJson (json, context, inlineImageMaxSize = 10000) {
  let isString = typeof json === 'string'
  if (isString) json = JSON.parse(json)

  const resolveImage = (key, value) => {
    if (typeof value === 'string' && /\.(gif|jpg|png|svg)(\?.*)?$/.test(value)) { return toBase64(context, value, inlineImageMaxSize) } else return value
  }

  const result = JSON.stringify(json, resolveImage, 2)

  if (isString) return result
  else JSON.parse(result)
}

module.exports = {
  toBase64,
  inlineImageFromJson
}
