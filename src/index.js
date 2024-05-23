import path from 'path';
import fs from 'fs';
import _ from 'lodash';

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

const compareKeys = (obj1, obj2) => _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

const checkDiff = (data1, data2, keys) => {
  return keys.map((key) => {
    if (_.has(data1, key) && _.has(data2, key)) {
      if (_.isEqual(data1[key], data2[key])) {
        return `  ${key}: ${data1[key]}`;
      }
      return `- ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    } if (_.has(data1, key)) {
      return `- ${key}: ${data1[key]}`;
    }
    return `+ ${key}: ${data2[key]}`;
  });
}

const genDiff = (filePath1, filePath2) => {
  const data1 = parseFile(filePath1);
  const data2 = parseFile(filePath2);
  const keys = compareKeys(data1, data2);
  const diff = checkDiff(data1, data2, keys);

  return `{\n  ${diff.join('\n  ')}\n}`;
};

export default genDiff;
export { parseFile };
