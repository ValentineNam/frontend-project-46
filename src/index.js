import _ from 'lodash';
import parseFile from './parsers.js';
import { extractFileContent, extractFileExt } from './extract.js';
import formatStylishOutput from './formatters/stylish.js';
import formatPlainOutput from './formatters/plain.js';
import returnDiffObject, { compareKeys } from './makediff.js';

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const file1Ext = extractFileExt(filePath1);
  const file1Content = extractFileContent(filePath1, 'utf8');

  const file2Ext = extractFileExt(filePath2);
  const file2Content = extractFileContent(filePath2, 'utf8');

  const data1 = parseFile(file1Content, file1Ext);
  const data2 = parseFile(file2Content, file2Ext);
  const keys = compareKeys(data1, data2);
  const diff = returnDiffObject(data1, data2, keys);

  switch (formatName) {
    case 'stylish':
      return formatStylishOutput(diff);

    case 'plain':
      return formatPlainOutput(diff);

    default:
      break;
  }
};

export default genDiff;
