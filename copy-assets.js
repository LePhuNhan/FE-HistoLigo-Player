const fs = require('fs-extra');

async function copyAssets() {
  try {
    await fs.copy('public/assets', 'build/static/media');
    console.log('Assets copied to build/media');
  } catch (err) {
    console.error('Error copying assets:', err);
  }
}

copyAssets();