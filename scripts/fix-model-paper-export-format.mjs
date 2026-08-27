// One-off fix: reformat the 10 Tamil model-paper source files from
// `export const X = {...}\n\nexport default X` (unquoted keys, no
// trailing `};`) to the canonical `export const X = {...};` shape
// (strict-JSON body, single quoted-key object, trailing `};`) that
// matches every other model-paper file in this directory and that
// frontend/app/lib/services/model_paper_service.dart's
// indexOf('{')/lastIndexOf('};')/jsonDecode parser requires.
//
// Usage: node scripts/fix-model-paper-export-format.mjs

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const examPapersDir = path.join(__dirname, '..', 'frontend', 'web', 'src', 'data', 'examPapers');

const files = [
  'class12ComputerApplicationsTamilModelQA1.js',
  'class12ComputerApplicationsTamilModelQA2.js',
  'class12ComputerApplicationsTamilModelQA3.js',
  'class12ComputerApplicationsTamilModelQA4.js',
  'class12ComputerApplicationsTamilModelQA5.js',
  'class12ComputerScienceTamilModelQA1.js',
  'class12ComputerScienceTamilModelQA2.js',
  'class12ComputerScienceTamilModelQA3.js',
  'class12ComputerScienceTamilModelQA4.js',
  'class12ComputerScienceTamilModelQA5.js',
];

let allOk = true;

for (const file of files) {
  const absPath = path.join(examPapersDir, file);
  const relPath = `frontend/web/src/data/examPapers/${file}`;
  const name = path.basename(file, '.js');

  const mod = await import(pathToFileURL(absPath).href);
  const obj = mod.default ?? Object.values(mod)[0];
  if (!obj) {
    console.log(`FAIL ${file}: no default/named export found`);
    allOk = false;
    continue;
  }

  const json = JSON.stringify(obj, null, 2);

  // Verify the literal substring '};' does not occur anywhere inside the
  // JSON body itself (e.g. inside a code-snippet explanation string) —
  // JSON.stringify never emits ';' so any hit here comes from string content.
  const earlyOccurrence = json.indexOf('};');
  if (earlyOccurrence !== -1) {
    console.log(
      `FAIL ${file}: literal "};" found inside JSON content at offset ${earlyOccurrence} — ` +
      `would break Dart's lastIndexOf('};') extraction. Not rewriting this file.`
    );
    allOk = false;
    continue;
  }

  const newContent = `// ${relPath}\n\nexport const ${name} = ${json};\n`;
  await writeFile(absPath, newContent, 'utf8');
  console.log(`OK ${file}: rewritten (${json.length} bytes JSON body)`);
}

console.log(allOk ? '\nALL REWRITTEN CLEAN' : '\nSOME FILES NEED MANUAL REVIEW');
process.exit(allOk ? 0 : 1);
