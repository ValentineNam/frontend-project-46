import path from 'path';
import process from 'process';
import fs from 'fs';
import _ from 'lodash';

const parseFile = (filePath) => {
  const fileExt = path.extname(filePath);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  switch (fileExt) {
    case '.json':
      return JSON.parse(fileContent);
    // Добавьте поддержку других форматов при необходимости
    default:
      throw new Error(`Формат файла ${fileExt} не поддерживается`);
  }
};

const genDiff = (filePath1, filePath2) => {
  const data1 = parseFile(filePath1);
  const data2 = parseFile(filePath2);

  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();
  
  const diff = keys.map((key) => {
    if (_.has(data1, key) && _.has(data2, key)) {
      if (_.isEqual(data1[key], data2[key])) {
        return `  ${key}: ${data1[key]}`;
      }
      return `- ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    } else if (_.has(data1, key)) {
      return `- ${key}: ${data1[key]}`;
    }
    return `+ ${key}: ${data2[key]}`;
  });

  return `{\n  ${diff.join('\n  ')}\n}`;
};

// const getFileFormat = (filePath) => {
//   const extname = path.extname(filePath);
//   switch (extname) {
//     case '.json':
//       return 'JSON';
//     case '.yml':
//       return 'YML';
//     case '.txt':
//       return 'TXT';
//     default:
//       return 'Неизвестный формат';
//   }
// }

export default genDiff;
