import React from 'react';
import { API_URL } from '../config';
import { storageName } from '../Types/auth';
import { IDataLogin, IFile, ObjectString, typeSort } from '../Types/types';
import { IApi, IMethod } from '../Types/api';
import { useAction } from './useAction';
import { setSettingUser } from '../actions/settingUser';
import { useAuth } from './useAuth';

export const useApi = (): IApi => {
  const token = JSON.parse(localStorage.getItem(storageName) || 'null')?.token;
  const { setLoadingRequest, setMessage, setSuccessRequest, logout } =
    useAction();
  const { auth } = useAuth();

  const request = async (
    url: string,
    method: IMethod = 'GET',
    bodyObject: ObjectString | FormData = {},
    headers: ObjectString = {}
  ) => {
    setLoadingRequest(true);

    let body: FormData | string | null = null;

    if (Object.keys(bodyObject).length !== 0) {
      body = JSON.stringify(bodyObject);
      headers['Content-Type'] = 'application/json';
    } else if (bodyObject instanceof FormData) {
      body = bodyObject;
    }
    headers['authorization'] = token || 'null';

    try {
      const response: Response = await fetch(API_URL + url, {
        method,
        body,
        headers,
      });
      const data = await response.json();

      console.log('data: ', data);

      token && auth(token);

      if (!response.ok) {
        throw new Error(data.message || 'Что-то пошло не так');
      }
      setMessage(data.message || '');

      setSuccessRequest(true);
      setTimeout(() => {
        setSuccessRequest(false);
      }, 1500);

      return data;
    } catch (e: any) {
      setMessage(e.message);
    } finally {
      setLoadingRequest(false);
    }
  };

  const registration = async (data: ObjectString): Promise<IDataLogin> =>
    await request('/api/auth/registration', 'POST', data);

  const login = async (data: ObjectString): Promise<IDataLogin> =>
    await request('/api/auth/login', 'POST', data);

  const getFiles = async (
    currentDir: string,
    typeSort: typeSort
  ): Promise<IFile[]> => {
    const response = await request(
      `/api/files?parent=${currentDir}&sort=${typeSort.toLowerCase()}`,
      'GET'
    );

    if (!response?.files) {
      logout();
      return [];
    }

    setSettingUser({ currentFolder: currentDir });
    return response.files;
  };

  const upLoadAvatar = async (data: FormData): Promise<void> =>
    await request('/api/files/avatar', 'POST', data);

  const createDir = async (data: ObjectString): Promise<IFile> =>
    await request('/api/files', 'POST', data);

  const uploadFile = (
    data: FormData,
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    callBack: () => void
  ) => {
    let xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.upload.onprogress = function (event) {
      const progress: number = (100 * event.loaded) / event.total;
      setProgress(progress);
    };

    xhr.onloadend = () => {
      callBack();
      if (xhr.status > 299) {
        setMessage(xhr.response?.message || 'Unknown error');
      }
    };

    xhr.open('POST', '/api/files/upload');
    xhr.setRequestHeader('authorization', token || '');
    xhr.send(data);

    token && auth(token);

    const cancel = xhr.abort.bind(xhr);
    return cancel;
  };

  const downloadFile = async (id: string, fileName: string): Promise<void> => {
    try {
      const response = await fetch(API_URL + `/api/files/download?id=${id}`, {
        headers: {
          authorization: token || 'null',
        },
      });

      if (response.status === 200) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        throw new Error('Error download');
      }
    } catch (error: any) {
      setMessage(error.message);
    } finally {
    }
  };

  const deleteFile = async (id: string): Promise<void> =>
    await request('/api/files/?id=' + id, 'DELETE');

  const renameFile = async (name: string, id: string): Promise<void> => {
    await request('/api/files/rename', 'POST', { name, id });
  };

  const shareFile = async (fileId: string): Promise<string> => {
    const response = await request('/api/files/share', 'POST', { fileId });

    if (!response?.accessLink) {
      return '';
    }

    return response.accessLink;
  };

  const api: IApi = {
    auth: {
      login,
      registration,
    },
    file: {
      createDir,
      getFiles,
      upLoadAvatar,
      deleteFile,
      downloadFile,
      uploadFile,
      renameFile,
      shareFile,
    },
  };

  return api;
};
