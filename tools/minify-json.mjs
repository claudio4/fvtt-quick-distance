import * as fs from 'node:fs/promises';

const srcDirPath = process.argv[2];
const outDirPath = process.argv[3];

if (!srcDirPath || !outDirPath) {
  console.error('please use node tools/minify-json.mjs srcDir outDir');
  process.exit(1);
}

const srcDir = await fs.opendir(srcDirPath);

await fs.mkdir(outDirPath, {recursive: true});

for await (const entry of srcDir) {
  if (!entry.isFile() || !entry.name.endsWith('.json')) continue;
  minifyFile(srcDirPath, outDirPath, entry.name);
}

/**
 * @param {string} srcDir
 * @param {string} outDir
 * @param {string} filename
 */
async function minifyFile(srcDir, outDir, filename) {
  const fileContent = await fs.readFile(srcDir + '/' + filename, {encoding: 'utf-8'});
  const obj = JSON.parse(fileContent);
  await fs.writeFile(outDir + '/' + filename, JSON.stringify(obj), {encoding: 'utf-8'});
}
