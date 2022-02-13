import dotenv from 'dotenv';
// import fetch from 'node-fetch';
const fetch = require('node-fetch');

dotenv.config();

const token: string = process.env.YANDEX_TOKEN || '';

type IMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATH';

export interface ObjectString {
  [key: string]: string;
}

const request = async (url: string, method: IMethod = 'GET') => {
  const body: null = null;
  const headers: ObjectString = {};

  headers['Content-Type'] = 'application/json';
  headers['Authorization'] = 'OAuth ' + token;

  const urlFetch = new URL(url);
  const response = await fetch(urlFetch, { method, body, headers });
  const data: any = await response.json();
  console.log('data: ', data);

  if (!response.ok) {
    throw new Error(data.message || 'Что-то пошло не так');
  }

  return data;
};

export const deleteFileYandexDisk = async (path: string) => {
  await request(
    `https://cloud-api.yandex.net/v1/disk/resources?path=${path}&force_async=true&permanently=true`,
    'DELETE'
  );
};

export const getUplodLink = async (path: string): Promise<string> => {
  const link = await request(
    `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${path}&overwrite=false&fields=href`
  );
  return link.href;
};

export const getDownloadLink = async (
  path: string
): Promise<{ public_key: string }> => {
  await request(
    `https://cloud-api.yandex.net/v1/disk/resources/publish?path=${path}`,
    'PUT'
  );
  const publicKey = await request(
    `https://cloud-api.yandex.net/v1/disk/resources?path=${path}&fields=public_key`
  );

  setTimeout(() => {
    request(
      `https://cloud-api.yandex.net/v1/disk/resources/unpublish?path=${path}`,
      'PUT'
    );
  }, 1000 * 60 * 1);

  return publicKey;
};

export const createFolderYandexDisk = async (path: string) => {
  await request(
    `https://cloud-api.yandex.net/v1/disk/resources?path=${path}`,
    'PUT'
  );
};
