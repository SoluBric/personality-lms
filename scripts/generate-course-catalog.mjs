import { readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'yaml';

const sourcePath = 'new-course-approach/02-course-catalog-v3.yaml';
const outputPath = 'src/lib/course-catalog-v3.json';

const catalog = parse(readFileSync(sourcePath, 'utf8'));
const json = `${JSON.stringify(catalog, null, 2)}\n`;

writeFileSync(outputPath, json);
console.log(`Generated ${outputPath} from ${sourcePath}`);
