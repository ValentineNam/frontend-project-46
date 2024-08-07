import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';
import { extractFileExt, extractFileContent } from '../src/extract.js';
import parseFile from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const expectedResultFlat = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const expectedResultTree = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);

test('genDiff json test', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const gendiffResult = genDiff(path1, path2);
  expect(gendiffResult).toEqual(expectedResultFlat);
});

test('genDiff yml test', () => {
  const path1 = getFixturePath('filepath1.yml');
  const path2 = getFixturePath('filepath2.yaml');
  const gendiffResult = genDiff(path1, path2);
  expect(gendiffResult).toEqual(expectedResultFlat);
});

test('genDiff tree object test', () => {
  const path1 = getFixturePath('filepath1.json');
  const path2 = getFixturePath('filepath2.json');
  const gendiffResult = genDiff(path1, path2);
  expect(gendiffResult).toEqual(expectedResultTree);
});

test('throws an error for unsupported file format', () => {
  const filePath = getFixturePath('testfile.txt'); // Пример файла с неподдерживаемым расширением
  const fileExt = extractFileExt(filePath);
  const fileContent = extractFileContent(filePath, 'utf8');
  expect(() => {
    parseFile(fileContent, fileExt);
  }).toThrowError(`Формат файла ${path.extname(filePath)} не поддерживается`);
});
