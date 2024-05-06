import path from 'path';
import process from 'process';
import fs from 'fs';

const gendiff = (path1, path2, opts) => {
  const file1Path = path.resolve(process.cwd(), path1);
  const file2Path = path.resolve(process.cwd(), path2);
  
  try {
    const fileContent1 = fs.readFileSync(file1Path, 'utf8');
    const fileContent2 = fs.readFileSync(file2Path, 'utf8');
    
    console.log('Содержимое файла 1:');
    console.log(fileContent1);
    
    console.log('Содержимое файла 2:');
    console.log(fileContent2);
  } catch (err) {
    console.error('Произошла ошибка при чтении файла:', err);
  }
}

export default gendiff;