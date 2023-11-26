import { unified } from 'unified'
import strip from 'strip-markdown'

export const mdToPlainTextProcessor = unified().use(strip)
