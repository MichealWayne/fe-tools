const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const preferredSourceDir = path.join(repoRoot, 'skills');
const fallbackSourceDir = path.join(repoRoot, 'utils', 'skills');
const targets = [
  path.join(repoRoot, '.codex', 'skills'),
  path.join(repoRoot, '.claude', 'skills'),
  path.join(repoRoot, '.cursor', 'skills'),
  path.join(repoRoot, '.trae', 'skills'),
  path.join(repoRoot, '.codebuddy', 'skills')
];

async function pathExists(targetPath) {
  try {
    await fs.promises.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(dirPath) {
  await fs.promises.mkdir(dirPath, { recursive: true });
}

async function copyDir(src, dest) {
  await ensureDir(dest);
  const entries = await fs.promises.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
}

async function syncSkills() {
  const sourceDir = (await pathExists(preferredSourceDir))
    ? preferredSourceDir
    : fallbackSourceDir;

  if (!(await pathExists(sourceDir))) {
    console.log('skills:sync: no skills directory found, skipping');
    return;
  }

  for (const target of targets) {
    await fs.promises.rm(target, { recursive: true, force: true });
    await copyDir(sourceDir, target);
    console.log(`skills:sync: synced to ${path.relative(repoRoot, target)}`);
  }
}

syncSkills().catch((error) => {
  console.error('skills:sync: failed', error);
  process.exitCode = 1;
});
