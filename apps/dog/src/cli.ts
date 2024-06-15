#!/usr/bin/env node
import fs from "fs";
import path from 'path';
import { runWebGenerator } from './webApp';
import { workingStorage } from "./storage.js";
import { getFaviconIco, getOgImageJpeg } from "./generators/index.js";
import { program } from "commander";

const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json/"), 'utf8'));

program
  .version(packageJson.version)
  .description(packageJson.description)

interface GenOptions {
  title?: string;
  description?: string;
}

program.command('gen', { isDefault: true })
  .description('Generate images')
  .option('-t, --title <title>', 'Title', undefined)
  .option('-d, --description <description>', 'Description', undefined)
  .action(async (options: GenOptions) => {
    const { default: inquirer } = await import('inquirer');
    const title: string = options.title || (await inquirer.prompt({
      type: 'input',
      name: 'title',
      message: 'Title'
    })).title;
    console.log(`🐶 Title: ${title}`)
    const description: string = options.description || (await inquirer.prompt({
      type: 'input',
      name: 'description',
      message: 'Description'
    })).description;
    console.log(`🐶 Description: ${description}`)
    console.log('🐶 Generating images...')
    const favicon = await getFaviconIco({ title })
    const ogImage = await getOgImageJpeg({ title, description })
    await workingStorage.setItemRaw('favicon.ico', favicon)
    await workingStorage.setItemRaw('og:image.jpg', ogImage)
    console.log('🐶 Done, wuaff! Check out \'.dog\' directory')
  })

program.command('web')
  .description('Run web generator')
  .action(() => {
    runWebGenerator();
  })

program.parse();
