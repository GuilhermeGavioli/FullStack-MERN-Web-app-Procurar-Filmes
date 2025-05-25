// build.js
const esbuild = require('esbuild');
const dotenv = require('dotenv');

// Load .env variables
const env = dotenv.config().parsed;

// Convert env vars to define-friendly format
const defineEnv = {};
for (const k in env) {
  defineEnv[`process.env.${k}`] = JSON.stringify(env[k]);
}

const file = 'main.js' 

// Run esbuild bundler
esbuild.build({
  entryPoints: [`../backend/build/${file}`],   // your app entry point
  outfile: `./bundle/${file}`,
  bundle: true,
  platform: 'node',
  target: 'node20',
  define: defineEnv
}).then(() => {
  console.log('Build complete');
}).catch((e) => {
    console.log(e)
    process.exit(1)
});
