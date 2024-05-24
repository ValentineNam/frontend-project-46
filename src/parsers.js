import path from 'path';
import fs from 'fs';

const parseFile = (filePath) => {
  const fileExt = path.extname(filePath);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  switch (fileExt) {
    case '.json':
      return JSON.parse(fileContent);
    default:
      throw new Error(`Формат файла ${fileExt} не поддерживается`);
  }
};

export default parseFile;