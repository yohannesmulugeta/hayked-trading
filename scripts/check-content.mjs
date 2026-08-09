import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { extname, join } from 'node:path';

const root = process.cwd();
const contentRoot = join(root, 'src', 'content');
const banned = [/replace with verified/i, /sample catalogue entry/i, /lorem ipsum/i, /demo content/i];
const failures = [];

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

for (const file of walk(contentRoot).filter((path) => extname(path) === '.json')) {
  const source = readFileSync(file, 'utf8');
  for (const pattern of banned) if (pattern.test(source)) failures.push(`${file}: contains ${pattern}`);
  const data = JSON.parse(source);
  for (const [key, value] of Object.entries(data)) {
    if ((key === 'image' || key.endsWith('Image')) && typeof value === 'string' && value.startsWith('/')) {
      const asset = join(root, 'public', value.slice(1));
      if (!existsSync(asset)) failures.push(`${file}: missing asset ${value}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('Content validation passed.');
