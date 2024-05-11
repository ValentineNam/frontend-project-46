import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const expectedResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`

const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);
// const resultExpected = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8').trim();

test('genDiff test', () => {
  const path1 = getFixturePath(`file1.json`);
  const path2 = getFixturePath(`file2.json`);
  const gendiffResult = genDiff(path1, path2);
  expect(gendiffResult).toEqual(expectedResult);
});