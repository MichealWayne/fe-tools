const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const packagesDir = path.join(rootDir, "packages");
const distDir = path.join(rootDir, "dist");

const pathExists = async (targetPath) => {
  try {
    await fs.promises.access(targetPath);
    return true;
  } catch {
    return false;
  }
};

const copyDir = async (srcDir, destDir) => {
  await fs.promises.mkdir(destDir, { recursive: true });
  const entries = await fs.promises.readdir(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
      continue;
    }

    if (entry.isFile()) {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
};

const syncPackageDist = async () => {
  const entries = await fs.promises.readdir(packagesDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const packageDir = entry.name;
    const sourceDir = path.join(distDir, packageDir);
    const targetDir = path.join(packagesDir, packageDir, "dist");

    if (!(await pathExists(sourceDir))) {
      continue;
    }

    await fs.promises.rm(targetDir, { recursive: true, force: true });
    await copyDir(sourceDir, targetDir);
  }
};

syncPackageDist().catch((error) => {
  console.error("Failed to sync package dist outputs.");
  console.error(error);
  process.exitCode = 1;
});
