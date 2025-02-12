const path = require('path');
const fs = require('fs');

const findExistFileAndRemove = async (file_path) => {
  try {
    await fs.unlinkSync(file_path);
    return true;
  } catch (error) {
    console.log('File remove error::.', error);
    throw new Error(error);
  }
};

module.exports = findExistFileAndRemove;
