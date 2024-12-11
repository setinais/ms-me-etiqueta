import * as fs from 'fs';
import * as ExcelJS from 'exceljs';

export const readFile = (filePath: string): fs.ReadStream => {
  return fs.createReadStream(filePath);
}

export const parseXlsxStream = async (stream: fs.ReadStream): Promise<ExcelJS.Worksheet> => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.read(stream);
  const worksheet = workbook.worksheets[0];
  return worksheet;
}

export const deleteFile = (filePath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}