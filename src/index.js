import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parseFile from './parsers';

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

const extractFileExt = (filePath) => path.extname(filePath);

const extractFileContent = (filePath, format = 'utf8') => fs.readFileSync(filePath, format);

const genDiff = (filePath1, filePath2) => {
  const file1Ext = extractFileExt(filePath1);
  const file1Content = extractFileContent(filePath1, 'utf8');

  const file2Ext = extractFileExt(filePath2);
  const file2Content = extractFileContent(filePath2, 'utf8');

  const data1 = parseFile(file1Content, file1Ext);
  const data2 = parseFile(file2Content, file2Ext);
  const keys = compareKeys(data1, data2);
  const diff = checkDiff(data1, data2, keys);

  return `{\n  ${diff.join('\n  ')}\n}`;
};

export default genDiff;
export { extractFileContent, extractFileExt };
