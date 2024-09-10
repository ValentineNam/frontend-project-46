import _ from 'lodash';

export const compareKeys = (obj1, obj2) => _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

const returnDiffObject = (data1, data2, keys) => {
  const diffObj = {};

  keys.forEach((key) => {
    if (!_.has(data1, key)) {
      diffObj[key] = { type: 'added', value: data2[key] };
    } else if (!_.has(data2, key)) {
      diffObj[key] = { type: 'deleted', value: data1[key] };
    } else if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      diffObj[key] = { type: 'nested', children: returnDiffObject(data1[key], data2[key], compareKeys(data1[key], data2[key])) };
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

export default returnDiffObject;