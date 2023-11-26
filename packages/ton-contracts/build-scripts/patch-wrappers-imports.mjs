import * as fs from 'fs/promises'
import { join } from 'path'

async function main() {
  // Load new imports string from file
  const newImports = await fs.readFile('./build-scripts/new-imports.ts', 'utf8')
  // Find all ts files in build folder and all subfolders
  const files = await fs.readdir('./build', {
    withFileTypes: true,
    recursive: true
  })
  const tsFiles = files.filter(
    (file) => file.isFile() && file.name.endsWith('.ts')
  )
  for (const file of tsFiles) {
    const filePath = join(file.path, file.name)
    // Read file
    const data = await fs.readFile(filePath, 'utf8')
    // Replace first 21 lines with new imports
    const result = newImports + data.split('\n').slice(21).join('\n')
    // Write result to file
    await fs.writeFile(filePath, result, 'utf8')
  }
}

main()
