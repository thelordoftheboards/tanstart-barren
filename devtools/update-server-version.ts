import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const rootPackageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
const serverPackageJsonPath = '.output/server/package.json';

const serverPackageJson = existsSync(serverPackageJsonPath)
  ? JSON.parse(readFileSync(serverPackageJsonPath, 'utf-8'))
  : {};

serverPackageJson.name = rootPackageJson.name;
serverPackageJson.version = rootPackageJson.version;

writeFileSync(serverPackageJsonPath, `${JSON.stringify(serverPackageJson, null, 2)}\n`);
