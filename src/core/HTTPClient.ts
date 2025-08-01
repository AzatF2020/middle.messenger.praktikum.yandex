import { HTTP_STATUS } from '../utils/constants/httpStatus.ts';
import { METHOD } from '../utils/constants/httpMethod.ts';

type Options<T = unknown> = {
  data?: T,
  headers?: Record<string, string>,
  withCredentials?: boolean,
  method?: METHOD,
}

interface IHTTPClient {
  get<T>(url: string, options?: Omit<Options<unknown>, 'data'>): Promise<T>

  post<T, S>(url: string, options?: Options<S>): Promise<T>

  put<T, S>(url: string, options?: Options<S>): Promise<T>

  patch<T, S>(url: string, options?: Options<S>): Promise<T>

  delete<T, S>(url: string, options?: Options<S>): Promise<T>
}

class HTTPClient implements IHTTPClient {
  private baseURL: string;

  constructor(url: string) {
    this.baseURL = `https://ya-praktikum.tech/api/v2${url}`;
  }

  private _request<T>(url: string = '', options: Options<unknown> = {
    method: METHOD.GET,
    headers: { 'Content-Type': 'application/json' },
  }): Promise<T> {
    const {
      headers = { 'Content-Type': 'application/json' },
      withCredentials = true,
      data,
      method,
    } = options;

    const currentURL = `${this.baseURL}${url}`;

    const isGet = method === METHOD.GET;

    const xhrURL = isGet && !data ? currentURL : currentURL;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(
        method || METHOD.GET,
        xhrURL,
      );

      if (!(data instanceof FormData)) {
        Object.entries(headers!).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      const onload = () => {
        const { status } = xhr;
        (status >= HTTP_STATUS.OK && status < HTTP_STATUS.BadRequest) ? resolve(xhr as T) : reject(JSON.parse(xhr?.response));
      };

      xhr.withCredentials = withCredentials;

      xhr.onload = onload;
      xhr.onerror = reject;
      xhr.onabort = reject;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }

  public get<T>(url?: string, options?: Omit<Options<unknown>, 'data'>): Promise<T> {
    return this._request(url, { ...options, method: METHOD.GET });
  }

  public post<T, S>(url: string, options?: Options<S>): Promise<T> {
    return this._request<T>(url, { ...options, method: METHOD.POST });
  }

  public put<T, S>(url: string, options?: Options<S>): Promise<T> {
    return this._request(url, { ...options, method: METHOD.PUT });
  }

  public patch<T, S>(url: string, options?: Options<S>): Promise<T> {
    return this._request(url, { ...options, method: METHOD.PATCH });
  }

  public delete<T, S>(url: string, options?: Options<S>): Promise<T> {
    return this._request(url, { ...options, method: METHOD.DELETE });
  }
}

export default HTTPClient;
