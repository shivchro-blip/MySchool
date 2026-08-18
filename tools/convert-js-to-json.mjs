#!/usr/bin/env node
// Mechanical converter: ES module .js (export default {...}) -> formatted JSON.
// Usage: node tools/convert-js-to-json.mjs <srcDir> <destDir>

import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [, , srcDirArg, destDirArg] = process.argv;

if (!srcDirArg || !destDirArg) {
  console.error('Usage: node tools/convert-js-to-json.mjs <srcDir> <destDir>');
  process.exit(1);
}

const srcDir = path.resolve(srcDirArg);
const destDir = path.resolve(destDirArg);

if (!existsSync(srcDir)) {
  console.error(`Source directory not found: ${srcDir}`);
  process.exit(1);
}

await mkdir(destDir, { recursive: true });

const entries = await readdir(srcDir);
const jsFiles = entries.filter((f) => f.endsWith('.js')).sort();

let converted = 0;
const errors = [];

for (const file of jsFiles) {
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(destDir, file.replace(/\.js$/, '.json'));
  try {
    const mod = await import(pathToFileURL(srcPath).href);
    const data = mod.default;
    if (data === undefined) {
      throw new Error('No default export found');
    }
    const json = JSON.stringify(data, null, 2);
    await writeFile(destPath, json + '\n', 'utf8');
    converted += 1;
  } catch (err) {
    errors.push({ file, message: err.message });
  }
}

console.log(`Source: ${srcDir}`);
console.log(`Dest:   ${destDir}`);
console.log(`Converted: ${converted}/${jsFiles.length}`);
if (errors.length) {
  console.log('Errors:');
  for (const e of errors) {
    console.log(`  ${e.file}: ${e.message}`);
  }
  process.exitCode = 1;
}
