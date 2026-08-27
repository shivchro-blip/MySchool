// Converts Shape-B/Shape-A web content modules (export default {...}) to Flutter JSON assets.
// Usage: node scripts/convert-web-content-to-flutter-json.mjs
//
// Reused across CA/CS Tamil Medium batches — add new [sourcePath, targetPath] pairs
// to CONVERSIONS below rather than writing a new script per batch.

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = 'C:/Projects/TNSchool';

const CONVERSIONS = [];

// CS Tamil — all 16 chapters (learn + practice), Shape A (sections[]).
const CS_TAMIL_SLUGS = [
  'ta-chapter-01-functions',
  'ta-chapter-02-data-abstraction',
  'ta-chapter-03-scoping',
  'ta-chapter-04-algorithmic-strategies',
  'ta-chapter-05-python-variables-operators',
  'ta-chapter-06-control-structures',
  'ta-chapter-07-python-functions',
  'ta-chapter-08-strings-manipulation',
  'ta-chapter-09-lists-tuples-sets-dictionary',
  'ta-chapter-10-python-classes-objects',
  'ta-chapter-11-database-concepts',
  'ta-chapter-12-sql',
  'ta-chapter-13-python-csv-files',
  'ta-chapter-14-importing-cpp-in-python',
  'ta-chapter-15-data-manipulation-sql',
  'ta-chapter-16-data-visualization-pyplot',
];
for (const kind of ['chapters', 'practice']) {
  for (const slug of CS_TAMIL_SLUGS) {
    CONVERSIONS.push([
      `${ROOT}/frontend/web/src/content/Class_12/ComputerScienceTamil/${kind}/${slug}.js`,
      `${ROOT}/frontend/app/assets/content/Class_12/ComputerScienceTamil/${kind}/${slug}.json`,
    ]);
  }
}

for (const [sourcePath, targetPath] of CONVERSIONS) {
  const mod = await import(pathToFileURL(sourcePath).href);
  const data = mod.default;
  const json = JSON.stringify(data, null, 2);
  mkdirSync(dirname(targetPath), { recursive: true });
  writeFileSync(targetPath, json, 'utf8');
  console.log(`wrote ${targetPath}`);
}
