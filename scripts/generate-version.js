import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const pkgPath = path.resolve(rootDir, 'package.json');
const publicDir = path.resolve(rootDir, 'public');
const versionFilePath = path.resolve(publicDir, 'version.json');

function getGitHash() {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch (e) {
    return 'none';
  }
}

function generateVersion() {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const versionInfo = {
    version: `${pkg.version}-${getGitHash()}`,
    buildTime: new Date().toISOString(),
  };

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  fs.writeFileSync(versionFilePath, JSON.stringify(versionInfo, null, 2));
  console.log(`✅ version.json generated at ${versionFilePath}`);
}

generateVersion();
