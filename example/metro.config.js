const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// Path to the root of your library
const root = path.resolve(__dirname, '..');

// Escape special regex characters
const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const config = {
  projectRoot: __dirname,
  
  // Watch the parent directory so Metro can see changes in /src
  watchFolders: [root],

  resolver: {
    // Block the node_modules in the parent to avoid duplicates
    blockList: [
      new RegExp(`${escapeRegExp(path.join(root, 'node_modules'))}/.*`),
    ],
    
    // Ensure all modules are resolved from example's node_modules
    extraNodeModules: new Proxy(
      {},
      {
        get: (target, name) => {
          // Redirect all module requests to example's node_modules
          return path.join(__dirname, `node_modules/${name}`);
        },
      }
    ),
  },
  
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);