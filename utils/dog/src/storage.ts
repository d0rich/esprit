import path from 'path'
import { fileURLToPath } from 'url'
import { createStorage } from 'unstorage'
import fsDriverModule from 'unstorage/drivers/fs'

// @ts-ignore
const fsDriver = fsDriverModule as typeof fsDriverModule['default']

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const assetsStorage = createStorage({
  driver: fsDriver({ base: path.resolve(__dirname, '../assets/') })
})

export const tmpStorage = createStorage({
  driver: fsDriver({ base: path.resolve(__dirname, '../.tmp/') })
})

export const workingStorage = createStorage({
  driver: fsDriver({ base: '.dog' })
})
