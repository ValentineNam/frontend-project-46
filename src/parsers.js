// import path from 'path';
// import fs from 'fs';

const parseFile = (fileContent, fileExt) => {
  switch (fileExt) {
    case '.json':
      return JSON.parse(fileContent);
    default:
      throw new Error(`Формат файла ${fileExt} не поддерживается`);
  }
};

export default parseFile;