import fs from 'fs/promises';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');

export async function readData(fileName) {
  const filePath = path.join(dataDirectory, `${fileName}.json`);
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function writeData(fileName, data) {
  const filePath = path.join(dataDirectory, `${fileName}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function updateData(fileName, id, updatedData) {
  const data = await readData(fileName);
  const index = data.findIndex(item => item.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedData };
    await writeData(fileName, data);
    return data[index];
  }
  return null;
}

export async function deleteData(fileName, id) {
  const data = await readData(fileName);
  const filteredData = data.filter(item => item.id !== id);
  if (data.length !== filteredData.length) {
    await writeData(fileName, filteredData);
    return true;
  }
  return false;
}