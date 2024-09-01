import { kv } from '@vercel/kv';

export async function readData(collection) {
  const data = await kv.get(collection);
  return data || [];
}

export async function writeData(collection, data) {
  await kv.set(collection, data);
}

export async function updateData(collection, id, updatedData) {
  const data = await readData(collection);
  const index = data.findIndex(item => item.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedData };
    await writeData(collection, data);
    return data[index];
  }
  return null;
}

export async function deleteData(collection, id) {
  const data = await readData(collection);
  const filteredData = data.filter(item => item.id !== id);
  if (data.length !== filteredData.length) {
    await writeData(collection, filteredData);
    return true;
  }
  return false;
}