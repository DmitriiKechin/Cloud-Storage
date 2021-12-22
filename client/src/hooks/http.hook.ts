import { useCallback, useContext, useState } from 'react';
import { GlobalContext } from '../contex/GlobalContext';
import { ObjectString } from '../Types/types';
import { useMessage } from './Message';

type IMethod =
  | 'GET'
  | 'POST'
  | 'DELETE'
  | 'HEAD'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATH';

export const useHttp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoadingSuccess, setIsLoadingSuccess] = useState<boolean>(false);
  const message = useMessage();
  const {
    auth: { requestCount, setRequestCount },
  } = useContext(GlobalContext);

  const request = useCallback(
    async (
      url: string,
      method: IMethod = 'GET',
      bodyObject: ObjectString | FormData = {},
      headers: ObjectString = {}
    ) => {
      setLoading(true);
      try {
        let body: FormData | string | null = null;

        if (Object.keys(bodyObject).length !== 0) {
          body = JSON.stringify(bodyObject);
          headers['Content-Type'] = 'application/json';
        } else if (bodyObject instanceof FormData) {
          body = bodyObject;
        }

        console.log('url: ', url);
        console.log('method: ', method);
        console.log('body: ', body);
        console.log('headers: ', headers);

        const response: Response = await fetch(url, { method, body, headers });

        const data = await response.json();
        console.log('data: ', data);
        setRequestCount(requestCount + 1);
        console.log('requestCount: ', requestCount);

        if (!response.ok) {
          throw new Error(data.message || 'Что-то пошло не так');
        }

        setLoading(false);
        setIsLoadingSuccess(true);
        message(data.message || '');

        setTimeout(() => {
          setIsLoadingSuccess(false);
        }, 1500);

        return data;
      } catch (e: any) {
        setLoading(false);
        message(e.message);
      } finally {
        message('');
      }
    },
    [message, requestCount, setRequestCount]
  );

  return { loading, request, isLoadingSuccess };
};
