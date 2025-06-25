// listFiles.js
// Usage: node listFiles.js [directory] [--exclude=...] [--depth=N]

// node listFiles.js --exclude=node_modules,.next,.bolt,*.hot-update.js,*.woff2,postcss.config.js,tailwind.config.ts,next-env.d.ts,.env.example,.eslintrc.json,.git,*.lock,trace

import fs from 'fs';
import path from 'path';
import minimatch from 'minimatch';

// Configuration
const CONFIG = {
  icons: {
    directory: '📂',
    file: '📄',
    symlink: '🔗'
  },
  colors: {
    directory: '\x1b[34m',
    file: '\x1b[90m',
    symlink: '\x1b[36m',
    reset: '\x1b[0m'
  },
  indent: {
    branch: '│   ',
    lastBranch: '    '
  }
};

function matchesExclusion(item, patterns) {
  return patterns.some(pattern => minimatch(item, pattern));
}

function listFiles(dir, exclude = [], maxDepth = Infinity, depth = 0, isLast = false) {
  if (depth > maxDepth) return;

  try {
    const items = fs.readdirSync(dir).sort();
    const filteredItems = items.filter(item => !matchesExclusion(item, exclude));

    filteredItems.forEach((item, index) => {
      const fullPath = path.join(dir, item);
      const stats = fs.lstatSync(fullPath);
      const isLastItem = index === filteredItems.length - 1;

      let indent = '';
      if (depth > 0) {
        indent = CONFIG.indent.branch.repeat(depth - 1) +
                 (isLast ? CONFIG.indent.lastBranch : CONFIG.indent.branch);
      }

      const prefix = isLastItem ? '└── ' : '├── ';
      let displayName;

      if (stats.isDirectory()) {
        displayName = `${CONFIG.colors.directory}${CONFIG.icons.directory} ${item}/${CONFIG.colors.reset}`;
      } else if (stats.isSymbolicLink()) {
        displayName = `${CONFIG.colors.symlink}${CONFIG.icons.symlink} ${item}${CONFIG.colors.reset}`;
      } else {
        displayName = `${CONFIG.colors.file}${CONFIG.icons.file} ${item}${CONFIG.colors.reset}`;
      }

      console.log(indent + prefix + displayName);

      if (stats.isDirectory()) {
        listFiles(fullPath, exclude, maxDepth, depth + 1, isLastItem);
      }
    });
  } catch (err) {
    console.error(`Failed to read: ${dir}`);
    console.error(err.message);
  }
}

function parseArgs() {
  const args = process.argv.slice(2);
  let targetDir = '.';
  let exclude = ['node_modules', '.git'];
  let depthLimit = Infinity;

  for (const arg of args) {
    if (arg.startsWith('--exclude=')) {
      exclude = arg.split('=')[1].split(',');
    } else if (arg.startsWith('--depth=')) {
      depthLimit = parseInt(arg.split('=')[1], 10);
    } else if (!arg.startsWith('--')) {
      targetDir = arg;
    }
  }

  return { targetDir, exclude, depthLimit };
}

// Run
const { targetDir, exclude, depthLimit } = parseArgs();
console.log(`\n📁 ${path.resolve(targetDir)}\n`);
listFiles(targetDir, exclude, depthLimit);
