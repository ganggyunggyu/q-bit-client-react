/**
   ============================================================================
   FSD Maker Script
   ============================================================================
   To run the FSD generator script, use the following command in your terminal:
  
   Intall:
   yarn add -D typescript ts-node @types/node @types/fs-extra
   yarn add fs-extra commander 

   package.json -> script -> "fsd-g": "ts-node fsd-maker.ts generate-fsd"
  
   Example:
   yarn fsd-g <depth> <domain>
   npm run fsd-g <depth> <domain>
  
   This will generate the folder structure and files for the specified feature.
   ============================================================================
*/

import { Command } from 'commander';
import * as fsExtra from 'fs-extra';
import * as fs from 'fs';
import * as path from 'path';

type DepthParam = 'entities' | 'feature';

type FsdParams = { depth: DepthParam; domain: string };
type DirName = 'hooks' | 'model' | 'ui' | 'api';

type IndexParams = {
  depth: DepthParam;
  domain: string;
  dirName: DirName;
};

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const ROOT_TEMPLATE = `export * from './api'
export * from './hooks'
export * from './model'
export * from './ui'
`;

const getRootIndexTemplate = (domain) => {
  return `export * from './${domain}';`;
};

const getIndexTemplate = (params: IndexParams): string => {
  return `export * from './${params.domain}.${params.dirName}';`;
};

const getCoreTemplate = (dirName, domain) => {
  return `export const ${dirName}${domain}Fn = () => {}`;
};

const createDirectory = (dirPath: string) => {
  fsExtra.ensureDirSync(dirPath);
  console.log(`Created: ${dirPath}`);
};

const createFile = (filePath: string, content: string) => {
  fs.writeFileSync(filePath, content);
  console.log(`Created: ${filePath}`);
};
const createRootIndex = (depth, domain) => {
  const rootDir = path.join(__dirname, 'src', depth);

  const rootIndexPath = path.join(rootDir, 'index.ts');
  const rootIndexContent = getRootIndexTemplate(domain);

  if (fs.existsSync(rootIndexPath)) {
    const fileContent = fs.readFileSync(rootIndexPath, 'utf8');

    if (!fileContent.includes(rootIndexContent)) {
      fs.appendFileSync(rootIndexPath, rootIndexContent);
    }
  } else {
    createFile(rootIndexPath, rootIndexContent);
  }
};

const createFsd = ({ depth, domain }: FsdParams) => {
  const baseDir = path.join(__dirname, 'src', depth, domain);

  const directories = ['api', 'ui', 'hooks', 'model'];

  directories.forEach((dir) => createDirectory(path.join(baseDir, dir)));

  createFile(path.join(baseDir, 'index.ts'), ROOT_TEMPLATE);

  const createDirectoryFiles = (dir: DirName) => {
    const dirPath = path.join(baseDir, dir);

    createFile(
      path.join(dirPath, 'index.ts'),
      getIndexTemplate({ depth, domain, dirName: dir }),
    );

    createFile(
      path.join(dirPath, `${domain}.${dir}.ts`),
      getCoreTemplate(dir, domain),
    );
  };

  createDirectoryFiles('api');
  createDirectoryFiles('ui');
  createDirectoryFiles('hooks');
  createDirectoryFiles('model');

  console.log(`${depth} ${domain} 폴더 구조 생성 완료 🚀`);
};

const program = new Command();

program
  .command('generate-fsd <depth> <domain>')
  .description('Generate feature structure with FSD')
  .action((depth, domain) => {
    createFsd({ depth, domain });
    createRootIndex(depth, domain);
  });

program.parse(process.argv);
