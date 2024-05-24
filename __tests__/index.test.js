import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff, {extractFileExt, extractFileContent} from '../src/index.js';
import parseFile from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const expectedResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);

test('genDiff json test', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const gendiffResult = genDiff(path1, path2);
  expect(gendiffResult).toEqual(expectedResult);
});

test('throws an error for unsupported file format', () => {
  const filePath = getFixturePath('testfile.txt'); // Пример файла с неподдерживаемым расширением
  const fileExt = extractFileExt(filePath);
  const fileContent = extractFileContent(filePath, 'utf8');
  expect(() => {
    parseFile(fileContent, fileExt);
  }).toThrowError(`Формат файла ${path.extname(filePath)} не поддерживается`);
});
