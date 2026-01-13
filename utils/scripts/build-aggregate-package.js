const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const aggregateDir = path.join(distDir, "fe-tools");
const rootPackageJsonPath = path.join(rootDir, "package.json");

const packageDirs = [
  "utils",
  "web-utils",
  "node-utils",
  "ai-utils",
  "canvas-utils",
  "env",
  "node-img-build",
];

const formats = ["esm", "cjs", "types"];

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

const loadRootPackage = async () => {
  const contents = await fs.promises.readFile(rootPackageJsonPath, "utf8");
  return JSON.parse(contents);
};

const buildAggregatePackageJson = (rootPackageJson) => {
  const exportsMap = {
    ".": {
      types: "./utils/types/index.d.ts",
      import: "./utils/esm/index.js",
      require: "./utils/cjs/index.js",
    },
  };

  for (const pkg of packageDirs) {
    exportsMap[`./${pkg}`] = {
      types: `./${pkg}/types/index.d.ts`,
      import: `./${pkg}/esm/index.js`,
      require: `./${pkg}/cjs/index.js`,
    };
  }

  return {
    name: "fe-tools",
    version: rootPackageJson.version,
    license: rootPackageJson.license,
    author: rootPackageJson.author,
    repository: rootPackageJson.repository,
    bugs: rootPackageJson.bugs,
    homepage: rootPackageJson.homepage,
    main: "./utils/cjs/index.js",
    module: "./utils/esm/index.js",
    types: "./utils/types/index.d.ts",
    exports: exportsMap,
    files: packageDirs.map((pkg) => `${pkg}/**/*`).concat(["package.json"]),
  };
};

const buildAggregatePackage = async () => {
  await fs.promises.rm(aggregateDir, { recursive: true, force: true });
  await fs.promises.mkdir(aggregateDir, { recursive: true });

  for (const pkg of packageDirs) {
    for (const format of formats) {
      const srcDir = path.join(distDir, pkg, format);
      const destDir = path.join(aggregateDir, pkg, format);

      if (!(await pathExists(srcDir))) {
        throw new Error(`Missing build output: ${path.relative(rootDir, srcDir)}`);
      }

      await copyDir(srcDir, destDir);
    }
  }

  const rootPackageJson = await loadRootPackage();
  const aggregatePackageJson = buildAggregatePackageJson(rootPackageJson);
  const aggregatePackageJsonPath = path.join(aggregateDir, "package.json");
  await fs.promises.writeFile(
    aggregatePackageJsonPath,
    `${JSON.stringify(aggregatePackageJson, null, 2)}\n`,
    "utf8"
  );
};

buildAggregatePackage().catch((error) => {
  console.error("Failed to build aggregated fe-tools package.");
  console.error(error);
  process.exitCode = 1;
});
