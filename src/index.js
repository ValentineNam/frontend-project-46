import path from 'path';
import process from 'process';
import fs from 'fs';

const gendiff = (path1, path2, opts) => {
  const file1Path = path.resolve(process.cwd(), path1);
  const file2Path = path.resolve(process.cwd(), path2);
  
  try {
    const fileContent1 = fs.readFileSync(file1Path, 'utf8');
    const fileContent2 = fs.readFileSync(file2Path, 'utf8');
    
    const fileFormat1 = getFileFormat(file1Path);
    const fileFormat2 = getFileFormat(file2Path);
    
    console.log('Содержимое файла 1:');
    console.log(`Формат файла 1: ${fileFormat1}`);
    console.log(fileContent1);
    
    console.log('Содержимое файла 2:');
    console.log(`Формат файла 2: ${fileFormat2}`);
    console.log(fileContent2);
  } catch (err) {
    console.error('Произошла ошибка при чтении файла:', err);
  }
}

const getFileFormat = (filePath) => {
  const extname = path.extname(filePath);
  switch (extname) {
    case '.json':
      return 'JSON';
    case '.yml':
      return 'YML';
    case '.txt':
      return 'TXT';
    // Добавьте другие форматы файлов при необходимости
    default:
      return 'Неизвестный формат';
  }
}

export default gendiff;