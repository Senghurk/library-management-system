import fs from 'fs/promises';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');

export async function readData(file) {
  const filePath = path.join(dataDirectory, `${file}.json`);
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

export async function writeData(file, data) {
  const filePath = path.join(dataDirectory, `${file}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function getData(file, id) {
  const data = await readData(file);
  return id ? data.find(item => item.id === id) : data;
}

export async function addData(file, newItem) {
  const data = await readData(file);
  const id = Math.max(...data.map(item => item.id), 0) + 1;
  const itemWithId = { ...newItem, id };
  data.push(itemWithId);
  await writeData(file, data);
  return itemWithId;
}

export async function updateData(file, id, updatedItem) {
  const data = await readData(file);
  const index = data.findIndex(item => item.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedItem };
    await writeData(file, data);
    return data[index];
  }
  return null;
}

export async function deleteData(file, id) {
  const data = await readData(file);
  const filteredData = data.filter(item => item.id !== id);
  if (data.length !== filteredData.length) {
    await writeData(file, filteredData);
    return true;
  }
  return false;
}