import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

export const mdToHtmlProcessor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeStringify)
