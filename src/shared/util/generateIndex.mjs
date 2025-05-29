import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, '../../app/store');

const toPascalCase = (str) => {
  return str
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (char) => char.toUpperCase());
};

const toKebabCase = (str) => {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

const toUseHookName = (str) => {
  const parts = str.split(/[-_]/).filter(Boolean);
  const base = parts
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');
  const name = base.startsWith('Use') ? base : 'Use' + base; //hooks

  return name.charAt(0).toLowerCase() + name.slice(1);
};

const indexPath = path.join(iconsDir, 'index.tsx');
fs.writeFileSync(indexPath, '// Auto-generated index.tsx\n');

fs.readdirSync(iconsDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory() && dirent.name !== 'index')
  .forEach((dir) => {
    const folderName = dir.name;
    const kebabName = toKebabCase(folderName);
    //kebab-name
    const pascalName = toPascalCase(folderName);
    //PascalName
    const hookName = toUseHookName(folderName);
    //useHook

    fs.appendFileSync(
      indexPath,
      `export { ${hookName} } from './${kebabName}';\n`,
    );
  });

console.log(`✅ index.ts 파일 생성 완료! (경로: ${indexPath})`);
