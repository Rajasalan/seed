const fs = require('fs');

// Create the JSON Schema using https://www.jsonschema.net/
const currentEnv = process.env.NODE_ENV || 'local';


function extend(a, b) { for (const x in b) a[x] = b[x]; }

const settings = require('./config/default');
if (currentEnv == 'dev') {
  extend(settings, require('./config/development'));
} else {
  try {
    extend(settings, require(`./config/${currentEnv}`));
  } catch (e) {
    console.warn(`Cannot load a config file for ${currentEnv} ${e}`);
  }
}

console.log("env is " + currentEnv + " isDev? " + settings.development);

try {
  const env = JSON.parse(fs.readFileSync('.env', 'ascii'));
  extend(settings, env);
} catch (err) {
  // it's OK if the .env file does not exist
}
module.exports = settings;
