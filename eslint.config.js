import { includeIgnoreFile } from '@eslint/compat'
import vueParser from 'vue-eslint-parser'
import eslintConfigPrettier from 'eslint-config-prettier'

import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

export default [
  eslintConfigPrettier,
  includeIgnoreFile(gitignorePath),
  {
    files: ['**/*.ts', '**/*.js', '**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    },
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'vue/no-multiple-template-root': 'off',
      'vue/multi-word-component-names': 'off'
    }
  }
]
