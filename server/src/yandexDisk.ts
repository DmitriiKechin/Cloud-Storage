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

  // setTimeout(() => {
  //   request(
  //     `https://cloud-api.yandex.net/v1/disk/resources/unpublish?path=${path}`,
  //     'PUT'
  //   );
  // }, 1000 * 60 * 1);

  return publicKey;
};

export const createFolderYandexDisk = async (path: string) => {
  await request(
    `https://cloud-api.yandex.net/v1/disk/resources?path=${path}`,
    'PUT'
  );
};

//https://cloud-api.yandex.net/v1/disk/public/resources/download?public_key=%20Kz1th1FhmTe2h51%2BTgndHIzQGRBQy45zB4QT82Xmk%2BcSFNR9EoYm1ttOJvRBvs5yq%2FJ6bpmRyOJonT3VoXnDag%3D%3D
//https://cloud-api.yandex.net/v1/disk/public/resources/download?public_key=Kz1th1FhmTe2h51+TgndHIzQGRBQy45zB4QT82Xmk+cSFNR9EoYm1ttOJvRBvs5yq/J6bpmRyOJonT3VoXnDag==
//https://downloader.disk.yandex.ru/disk/fae9b6bdbb85179cfc7ffb8fa0e86d359788fc2e46327bb460dc457d60518190/6209a8bd/6466gZAi_Ghtyy0oTlUXWwZeXJKtE7gaxKkkwCdsubRj2-HPVMBUu_Y1TKlXawsXQoawS1neO_sQxnzuIN7hSA%3D%3D?uid=0&filename=_DSC0363%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F%20%282%29.jpg&disposition=attachment&hash=Kz1th1FhmTe2h51%2BTgndHIzQGRBQy45zB4QT82Xmk%2BcSFNR9EoYm1ttOJvRBvs5yq/J6bpmRyOJonT3VoXnDag%3D%3D%3A&limit=0&content_type=image%2Fjpeg&owner_uid=30468971&fsize=13174611&hid=e6d4e99bf281029568be0a9f78d2ab0d&media_type=image&tknv=v2
