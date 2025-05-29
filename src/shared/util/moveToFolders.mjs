import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Dir = path.join(__dirname, '../../app/store');

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

// const tsxFiles = fs.readdirSync(Dir).filter((file) => file.endsWith('.tsx'));
const tsFiles = fs.readdirSync(Dir).filter((file) => file.endsWith('.ts'));

tsFiles.forEach((file) => {
  const baseName = path.basename(file, '.tsx');
  const kebabName = toKebabCase(baseName);
  const hookName = toUseHookName(baseName);

  if (file.includes('index')) return;

  const folderName = `${hookName}`;
  const folderPath = path.join(Dir, folderName);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  const oldPath = path.join(Dir, file);
  const newPath = path.join(folderPath, 'index.tsx');

  fs.renameSync(oldPath, newPath);
  console.log(`✅ ${file} → ${folderName}/index.tsx`);
});

console.log('🎉 폴더 생성 완료!');
