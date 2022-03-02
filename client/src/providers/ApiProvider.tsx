import { useCallback } from 'react';
import { APIContext } from '../contex/ApiContext';
import useAuth from '../hooks/auth.hook';
import useMessage from '../hooks/message.hook';
import useRequest from '../hooks/request.hook';
import { IDataLogin, IFile, ObjectString, typeSort } from '../Types/types';

type IMethod =
  | 'GET'
  | 'POST'
  | 'DELETE'
  | 'HEAD'
  | 'PUT'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATH';

const APIProvider: React.FC = ({ children }) => {
  const { token, isAuthorization, auth, logout, setSettingUser } = useAuth();
  const { setMessage } = useMessage();
  const { setLoading, setIsSuccess } = useRequest();

  const request = useCallback(
    async (
      url: string,
      method: IMethod = 'GET',
      bodyObject: ObjectString | FormData = {},
      headers: ObjectString = {}
    ) => {
      setLoading(true);

      let body: FormData | string | null = null;

      if (Object.keys(bodyObject).length !== 0) {
        body = JSON.stringify(bodyObject);
        headers['Content-Type'] = 'application/json';
      } else if (bodyObject instanceof FormData) {
        body = bodyObject;
      }
      headers['authorization'] = token || 'null';

      try {
        const response: Response = await fetch(url, { method, body, headers });
        const data = await response.json();

        console.log('data: ', data);

        token && auth(token, isAuthorization);

        if (!response.ok) {
          throw new Error(data.message || 'Что-то пошло не так');
        }
        setMessage(data.message || '');

        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 1500);

        return data;
      } catch (e: any) {
        setMessage(e.message);
      } finally {
        setLoading(false);
        setMessage('');
      }
    },
    [auth, isAuthorization, setIsSuccess, setLoading, setMessage, token]
  );

  const registration = useCallback(
    async (data: ObjectString): Promise<IDataLogin> =>
      await request('/api/auth/registration', 'POST', data),
    [request]
  );

  const login = useCallback(
    async (data: ObjectString): Promise<IDataLogin> =>
      await request('/api/auth/login', 'POST', data),
    [request]
  );

  const getFiles = useCallback(
    async (currentDir: string, typeSort: typeSort): Promise<IFile[]> => {
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
    },
    [logout, request, setSettingUser]
  );

  const upLoadAvatar = useCallback(
    async (data: FormData): Promise<void> =>
      await request('/api/files/avatar', 'POST', data),
    [request]
  );

  const createDir = useCallback(
    async (data: ObjectString): Promise<IFile> =>
      await request('/api/files', 'POST', data),
    [request]
  );

  const uploadFile = useCallback(
    async (
      data: FormData,
      setProgress: React.Dispatch<React.SetStateAction<number>>,
      callBack: () => void
    ) => {
      const file: any = data.get('file');
      const dataServer = {
        size: file.size.toString(),
        name: file.name,
        parent: data.get('parent')?.toString() || '',
      };
      const url = await request('/api/files/upload', 'POST', dataServer);

      if (!url) {
        return () => {};
      }

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
        setMessage('');
      };

      const dataYandex = new FormData();
      dataYandex.append('file', file);
      console.log('url', url);
      xhr.open('PUT', url.href);
      xhr.send(dataYandex);

      // xhr.open('POST', '/api/files/upload');
      // xhr.setRequestHeader('authorization', token || '');
      // xhr.send(data);

      token && auth(token, isAuthorization);

      const cancel = xhr.abort.bind(xhr);
      return cancel;
    },
    [auth, isAuthorization, request, setMessage, token]
  );

  const downloadFile = useCallback(
    async (id: string, fileName: string): Promise<void> => {
      try {
        const response = await fetch(`/api/files/download?id=${id}`, {
          headers: {
            authorization: token || 'null',
          },
        });

        if (!response.ok) {
          throw new Error('Error download');
        }

        const urlDownload = (await response.json()).href;
        console.log('urlDownload: ', urlDownload);
        let url = new URL(urlDownload);

        const downloadResponse = await fetch(
          `/api/proxy${url.toString().slice(url.origin.length)}`
        );

        if (!downloadResponse.ok) {
          throw new Error('Error download');
        }

        const blob = await downloadResponse.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error: any) {
        setMessage(error.message);
      } finally {
        setMessage('');
      }
    },
    [setMessage, token]
  );

  const deleteFile = useCallback(
    async (id: string): Promise<void> =>
      await request('/api/files/?id=' + id, 'DELETE'),
    [request]
  );

  const renameFile = useCallback(
    async (name: string, id: string): Promise<void> => {
      await request('/api/files/rename', 'POST', { name, id });
    },
    [request]
  );

  const shareFile = useCallback(
    async (fileId: string): Promise<string> => {
      const response = await request('/api/files/share', 'POST', { fileId });

      if (!response?.accessLink) {
        return '';
      }

      return response.accessLink;
    },
    [request]
  );
  // useEffect(() => {
  //   console.log('request');
  // }, [request]);

  return (
    <APIContext.Provider
      value={{
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
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export default APIProvider;
