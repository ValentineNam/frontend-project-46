import _ from 'lodash';
import parseFile from './parsers.js';
import { extractFileContent, extractFileExt } from './extract.js';
import formatDiffOutput from './stylish.js';

const compareKeys = (obj1, obj2) => _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

const returnkDiffObject = (data1, data2, keys) => {
  const diffObj = {};

  keys.forEach((key) => {
    if (!_.has(data1, key)) {
      diffObj[key] = { type: 'added', value: data2[key] };
    } else if (!_.has(data2, key)) {
      diffObj[key] = { type: 'deleted', value: data1[key] };
    } else if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      diffObj[key] = { type: 'nested', children: returnkDiffObject(data1[key], data2[key], compareKeys(data1[key], data2[key])) };
    } else if (_.has(data1, key) && _.has(data2, key)) {
      if (_.isEqual(data1[key], data2[key])) {
        diffObj[key] = { type: 'unchanged', value: data1[key] };
      } else {
        diffObj[key] = { type: 'changed', oldValue: data1[key], newValue: data2[key] };
      }
    }
  });

  return diffObj;
};

const genDiff = (filePath1, filePath2) => {
  const file1Ext = extractFileExt(filePath1);
  const file1Content = extractFileContent(filePath1, 'utf8');

  const file2Ext = extractFileExt(filePath2);
  const file2Content = extractFileContent(filePath2, 'utf8');

  const data1 = parseFile(file1Content, file1Ext);
  const data2 = parseFile(file2Content, file2Ext);
  const keys = compareKeys(data1, data2);
  const diff = returnkDiffObject(data1, data2, keys);

  return formatDiffOutput(diff);
};

export default genDiff;
