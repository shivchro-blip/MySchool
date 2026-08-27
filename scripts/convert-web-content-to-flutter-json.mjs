// Converts Shape-B web content modules (export default {...}) to Flutter JSON assets.
// Usage: node scripts/convert-web-content-to-flutter-json.mjs
//
// Reused across CA/CS Tamil Medium batches — add new [sourcePath, targetPath] pairs
// to CONVERSIONS below rather than writing a new script per batch.

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = 'C:/Projects/TNSchool';

const CONVERSIONS = [
  [
    `${ROOT}/frontend/web/src/content/Class_12/ComputerApplicationsTamil/chapters/ta-chapter-01-multimedia.js`,
    `${ROOT}/frontend/app/assets/content/Class_12/ComputerApplicationsTamil/chapters/ta-chapter-01-multimedia.json`,
  ],
  [
    `${ROOT}/frontend/web/src/content/Class_12/ComputerApplicationsTamil/chapters/ta-chapter-02-pagemaker.js`,
    `${ROOT}/frontend/app/assets/content/Class_12/ComputerApplicationsTamil/chapters/ta-chapter-02-pagemaker.json`,
  ],
  [
    `${ROOT}/frontend/web/src/content/Class_12/ComputerApplicationsTamil/chapters/ta-chapter-03-dbms.js`,
    `${ROOT}/frontend/app/assets/content/Class_12/ComputerApplicationsTamil/chapters/ta-chapter-03-dbms.json`,
  ],
  [
    `${ROOT}/frontend/web/src/content/Class_12/ComputerApplicationsTamil/chapters/ta-chapter-04-php-intro.js`,
    `${ROOT}/frontend/app/assets/content/Class_12/ComputerApplicationsTamil/chapters/ta-chapter-04-php-intro.json`,
  ],
  [
    `${ROOT}/frontend/web/src/content/Class_12/ComputerApplicationsTamil/practice/ta-chapter-01-multimedia.js`,
    `${ROOT}/frontend/app/assets/content/Class_12/ComputerApplicationsTamil/practice/ta-chapter-01-multimedia.json`,
  ],
  [
    `${ROOT}/frontend/web/src/content/Class_12/ComputerApplicationsTamil/practice/ta-chapter-02-pagemaker.js`,
    `${ROOT}/frontend/app/assets/content/Class_12/ComputerApplicationsTamil/practice/ta-chapter-02-pagemaker.json`,
  ],
  [
    `${ROOT}/frontend/web/src/content/Class_12/ComputerApplicationsTamil/practice/ta-chapter-03-dbms.js`,
    `${ROOT}/frontend/app/assets/content/Class_12/ComputerApplicationsTamil/practice/ta-chapter-03-dbms.json`,
  ],
  [
    `${ROOT}/frontend/web/src/content/Class_12/ComputerApplicationsTamil/practice/ta-chapter-04-php-intro.js`,
    `${ROOT}/frontend/app/assets/content/Class_12/ComputerApplicationsTamil/practice/ta-chapter-04-php-intro.json`,
  ],
];

for (const [sourcePath, targetPath] of CONVERSIONS) {
  const mod = await import(pathToFileURL(sourcePath).href);
  const data = mod.default;
  const json = JSON.stringify(data, null, 2);
  mkdirSync(dirname(targetPath), { recursive: true });
  writeFileSync(targetPath, json, 'utf8');
  console.log(`wrote ${targetPath}`);
}
