import { version } from './package.json';
import { terser } from 'rollup-plugin-terser';
import url from '@rollup/plugin-url';
import strip from '@rollup/plugin-strip';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import cleaner from 'rollup-plugin-cleaner';

const isProduction = process.env.NODE_ENV === 'production';

const getPlugins = () => [
  cleaner({
    targets: [
      './build/'
    ]
  }),
  url(),
  postcss(),
  typescript({
    tsconfig: "tsconfig.json",
    lib: ["es5", "es6", "dom"],
    target: "ES2020",
  }),
  isProduction && strip(),
  isProduction && terser(),
];

export default [{
  // core input options
  // external: [],
  input: 'src/index.ts', // required
  plugins: getPlugins(),

  output: { // required (can be an array, for multiple outputs)
    // core output options
    dir: 'build',
    // file: "build/js/main.js",
    format: 'esm', // required
    // globals,
    // name,
    plugins: [],

    // advanced output options
    // assetFileNames,
    banner: `// v${version}`,
    // chunkFileNames,
    compact: isProduction ? true : false,
    // entryFileNames,
    // extend,
    // footer,
    // interop,
    // intro,
    // outro,
    // paths: { react: 'https://cdn-react-link' },
    sourcemap: true,
    // sourcemapExcludeSources,
    // sourcemapFile,
    // sourcemapPathTransform,

    // danger zone
    // amd,
    // dynamicImportFunction,
    // esModule,
    // exports,
    // externalLiveBindings,
    // freeze,
    // indent,
    // namespaceToStringTag,
    // noConflict,
    // preferConst,
    // strict
  },


  // advanced input options
  cache: true,
  //   inlineDynamicImports,
  manualChunks: (id) => {
    if (id.includes('node_modules')) {
      return 'vendor';
    }
  },
  //   onwarn,
  //   preserveModules,
  strictDeprecations: true,

  // danger zone
  //   acorn,
  //   acornInjectPlugins,
  //   context,
  //   moduleContext,
  //   preserveSymlinks,
  //   shimMissingExports,
  //   treeshake,

  // experimental
  //   chunkGroupingSize,
  //   experimentalCacheExpiry,
  //   experimentalOptimizeChunks,
  //   perf,

  watch: {
    // chokidar,
    // clearScreen,
    // exclude,
    // include
  }
}]