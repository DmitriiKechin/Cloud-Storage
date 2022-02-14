import { useCallback } from 'react';
import { APIContext } from '../contex/ApiContext';
import downloadViaForm from '../global_Function/downloadViaForm';
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

        const publicKey = (await response.json()).public_key;
        console.log('publicKey: ', publicKey);

        const responseUrlDownload = await fetch(
          `https://cloud-api.yandex.net/v1/disk/public/resources/download?public_key=${encodeURIComponent(
            publicKey
          )}`
        );

        if (!responseUrlDownload.ok) {
          throw new Error('Error download');
        }

        const urlDownload = await responseUrlDownload.json();
        console.log('urlDownload: ', urlDownload.href);

        // const form = document.createElement('form');

        // form.target = 'formDownload';
        // form.method = 'get';
        // form.action =
        //   'https://downloader.disk.yandex.ru/disk/6ec056cd25a1f31ca11e71e08324c5c2481eb29ceb6bdd95da7d063facc7a2be/620ab124/6466gZAi_Ghtyy0oTlUXWwZeXJKtE7gaxKkkwCdsubRj2-HPVMBUu_Y1TKlXawsXQoawS1neO_sQxnzuIN7hSA%3D%3D';
        // form.innerHTML = '<input name="uid" value="0">';
        // form.innerHTML += `<input name="filename" value="${decodeURIComponent(
        //   '_DSC0363%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F%20%282%29.jpg'
        // )}">`;
        // form.innerHTML += '<input name="disposition" value="attachment">';
        // form.innerHTML += `<input name="hash" value="${decodeURIComponent(
        //   'Kz1th1FhmTe2h51%2BTgndHIzQGRBQy45zB4QT82Xmk%2BcSFNR9EoYm1ttOJvRBvs5yq/J6bpmRyOJonT3VoXnDag%3D%3D%3A'
        // )}">`;
        // form.innerHTML += '<input name="limit" value="0">';
        // form.innerHTML += `<input name="content_type" value="${decodeURIComponent(
        //   'image%2Fjpeg'
        // )}">`;
        // form.innerHTML += '<input name="owner_uid" value="30468971">';
        // form.innerHTML += '<input name="fsize" value="13174611">';
        // form.innerHTML +=
        //   '<input name="hid" value="e6d4e99bf281029568be0a9f78d2ab0d">';
        // form.innerHTML += '<input name="media_type" value="image">';
        // form.innerHTML += '<input name="tknv" value="v2">';

        // //media_type=image&tknv=v2
        // //https://downloader.disk.yandex.ru/disk/6ec056cd25a1f31ca11e71e08324c5c2481eb29ceb6bdd95da7d063facc7a2be/620ab124/6466gZAi_Ghtyy0oTlUXWwZeXJKtE7gaxKkkwCdsubRj2-HPVMBUu_Y1TKlXawsXQoawS1neO_sQxnzuIN7hSA%3D%3D?uid=0&filename=_DSC0363+копия+%282%29.jpg&disposition=attachment&hash=Kz1th1FhmTe2h51%2BTgndHIzQGRBQy45zB4QT82Xmk%2BcSFNR9EoYm1ttOJvRBvs5yq%2FJ6bpmRyOJonT3VoXnDag%3D%3D%3A&limit=0&content_type=image%2Fjpeg&owner_uid=30468971&fsize=13174611&hid=e6d4e99bf281029568be0a9f78d2ab0d&media_type=image&tknv=v2
        // //https://downloader.disk.yandex.ru/disk/6ec056cd25a1f31ca11e71e08324c5c2481eb29ceb6bdd95da7d063facc7a2be/620ab124/6466gZAi_Ghtyy0oTlUXWwZeXJKtE7gaxKkkwCdsubRj2-HPVMBUu_Y1TKlXawsXQoawS1neO_sQxnzuIN7hSA%3D%3D?uid=0&filename=_DSC0363%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F%20%282%29.jpg&disposition=attachment&hash=Kz1th1FhmTe2h51%2BTgndHIzQGRBQy45zB4QT82Xmk%2BcSFNR9EoYm1ttOJvRBvs5yq/J6bpmRyOJonT3VoXnDag%3D%3D%3A&limit=0&content_type=image%2Fjpeg&owner_uid=30468971&fsize=13174611&hid=e6d4e99bf281029568be0a9f78d2ab0d&media_type=image&tknv=v2

        //form.action:  https://downloader.disk.yandex.ru/disk/6ec056cd25a1f31ca11e71e08324c5c2481eb29ceb6bdd95da7d063facc7a2be/620ab124/6466gZAi_Ghtyy0oTlUXWwZeXJKtE7gaxKkkwCdsubRj2-HPVMBUu_Y1TKlXawsXQoawS1neO_sQxnzuIN7hSA%3D%3D
        //form.action:  https://downloader.disk.yandex.ru/disk/6ec056cd25a1f31ca11e71e08324c5c2481eb29ceb6bdd95da7d063facc7a2be/620ab124/6466gZAi_Ghtyy0oTlUXWwZeXJKtE7gaxKkkwCdsubRj2-HPVMBUu_Y1TKlXawsXQoawS1neO_sQxnzuIN7hSA%3D%3D
        //form.innerHTML:  <input name="uid" value="0"><input name="filename" value="_DSC0363 копия (2).jpg"><input name="disposition" value="attachment"><input name="hash" value="Kz1th1FhmTe2h51+TgndHIzQGRBQy45zB4QT82Xmk+cSFNR9EoYm1ttOJvRBvs5yq/J6bpmRyOJonT3VoXnDag==:"><input name="limit" value="0"><input name="content_type" value="image/jpeg"><input name="owner_uid" value="30468971"><input name="fsize" value="13174611"><input name="hid" value="e6d4e99bf281029568be0a9f78d2ab0d"><input name="media_type" value="image"><input name="tknv" value="v2">
        //form.innerHTML:  <input name="uid" value="0"><input name="filename" value="_DSC0363 копия (2).jpg"><input name="disposition" value="attachment"><input name="hash" value="Kz1th1FhmTe2h51+TgndHIzQGRBQy45zB4QT82Xmk+cSFNR9EoYm1ttOJvRBvs5yq/J6bpmRyOJonT3VoXnDag==:"><input name="limit" value="0"><input name="content_type" value="image/jpeg"><input name="owner_uid" value="30468971"><input name="fsize" value="13174611"><input name="hid" value="e6d4e99bf281029568be0a9f78d2ab0d"><input name="media_type" value="image"><input name="tknv" value="v2"></input>
        // document.body.appendChild(form);
        // form.submit();

        downloadViaForm(urlDownload.href);
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
