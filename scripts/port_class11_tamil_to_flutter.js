// One-off script: port Class 11 CA/CS Tamil web content (.js) to Flutter JSON assets.
// Run: node scripts/port_class11_tamil_to_flutter.js
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const WEB = path.join(ROOT, 'frontend/web/src');
const APP = path.join(ROOT, 'frontend/app');

function evalDefaultExport(source) {
  const idx = source.indexOf('export default');
  if (idx < 0) throw new Error('no export default found');
  const exprSource = source.slice(idx + 'export default'.length);
  // eslint-disable-next-line no-new-func
  return new Function('return (' + exprSource + ')')();
}

function convertDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  const files = fs.readdirSync(srcDir).filter((f) => f.endsWith('.js'));
  const results = [];
  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const source = fs.readFileSync(srcPath, 'utf8');
    let obj;
    try {
      obj = evalDefaultExport(source);
    } catch (err) {
      results.push({ file, ok: false, error: err.message });
      continue;
    }
    const destName = file.replace(/\.js$/, '.json');
    const destPath = path.join(destDir, destName);
    fs.writeFileSync(destPath, JSON.stringify(obj, null, 2), 'utf8');
    results.push({ file, ok: true, destPath });
  }
  return results;
}

const jobs = [
  {
    label: 'CA-Tamil chapters',
    src: path.join(WEB, 'content/Class_11/ComputerApplicationsTamil/chapters'),
    dest: path.join(APP, 'assets/content/Class_11/ComputerApplicationsTamil/chapters'),
  },
  {
    label: 'CA-Tamil practice',
    src: path.join(WEB, 'content/Class_11/ComputerApplicationsTamil/practice'),
    dest: path.join(APP, 'assets/content/Class_11/ComputerApplicationsTamil/practice'),
  },
  {
    label: 'CS-Tamil chapters',
    src: path.join(WEB, 'content/Class_11/ComputerScienceTamil/chapters'),
    dest: path.join(APP, 'assets/content/Class_11/ComputerScienceTamil/chapters'),
  },
  {
    label: 'CS-Tamil practice',
    src: path.join(WEB, 'content/Class_11/ComputerScienceTamil/practice'),
    dest: path.join(APP, 'assets/content/Class_11/ComputerScienceTamil/practice'),
  },
];

let totalOk = 0;
let totalFail = 0;
for (const job of jobs) {
  console.log(`\n=== ${job.label} ===`);
  const results = convertDir(job.src, job.dest);
  for (const r of results) {
    if (r.ok) {
      totalOk++;
      console.log(`OK   ${r.file}`);
    } else {
      totalFail++;
      console.log(`FAIL ${r.file}: ${r.error}`);
    }
  }
}

// Model papers: every existing Flutter model-paper asset uses a JSON-strict body
// (quoted keys, trailing `};`) inside an `export const NAME = {...};` wrapper, which
// is what ModelPaperService._loadRaw()'s indexOf('{')...lastIndexOf('};') + jsonDecode
// extraction requires. The Class 11 Tamil web sources use unquoted JS-literal keys
// (chapter-authoring style) and are missing the trailing semicolon, so a byte copy
// breaks that extraction. Evaluate + re-serialize as JSON instead of copying as-is.
const modelPaperSrc = path.join(WEB, 'data/examPapers');
const modelPaperDest = path.join(APP, 'assets/model_papers');
const modelPaperFiles = [
  'class11ComputerApplicationsTamilModelQA1.js',
  'class11ComputerApplicationsTamilModelQA2.js',
  'class11ComputerApplicationsTamilModelQA3.js',
  'class11ComputerApplicationsTamilModelQA4.js',
  'class11ComputerApplicationsTamilModelQA5.js',
  'class11ComputerScienceTamilModelQA1.js',
  'class11ComputerScienceTamilModelQA2.js',
  'class11ComputerScienceTamilModelQA3.js',
  'class11ComputerScienceTamilModelQA4.js',
  'class11ComputerScienceTamilModelQA5.js',
];
console.log('\n=== Model papers (eval + re-serialize as JSON-strict) ===');
for (const f of modelPaperFiles) {
  const srcPath = path.join(modelPaperSrc, f);
  const destPath = path.join(modelPaperDest, f);
  const source = fs.readFileSync(srcPath, 'utf8');
  const nameMatch = source.match(/export const\s+(\w+)\s*=/);
  if (!nameMatch) {
    console.log(`FAIL ${f}: no "export const NAME =" found`);
    continue;
  }
  const name = nameMatch[1];
  let objSource = source.slice(source.indexOf('=') + 1).trim();
  if (objSource.endsWith(';')) objSource = objSource.slice(0, -1);
  let obj;
  try {
    obj = new Function('return (' + objSource + ')')();
  } catch (err) {
    console.log(`FAIL ${f}: ${err.message}`);
    continue;
  }
  const out = `export const ${name} = ${JSON.stringify(obj, null, 2)};\n`;
  fs.writeFileSync(destPath, out, 'utf8');
  console.log(`OK   ${f}`);
}

console.log(`\nTOTAL chapters/practice: ${totalOk} ok, ${totalFail} fail`);
console.log(`TOTAL model papers copied: ${modelPaperFiles.length}`);
