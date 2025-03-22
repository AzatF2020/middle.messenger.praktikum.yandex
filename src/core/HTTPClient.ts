// # Базовая реализовая класса
import { METHOD } from '@utils/constants/httpMethod';

type Options<T> = {
  data?: T,
  headers?: Record<string, string>,
  withCredentials?: boolean,
  method: METHOD,
}

class HTTPClient {
  private request<T>(url: string, options: Options<T> = {
    method: METHOD.GET,
    headers: { 'Content-Type': 'application/json' },
  }) {
    const {
      headers = { 'Content-Type': 'application/json' },
      withCredentials = false,
      data,
      method,
    } = options;

    const isGet = method === METHOD.GET;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.withCredentials = withCredentials;

      Object.entries(headers!).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      const onload = () => {
        resolve(xhr);
      };

      xhr.onload = onload;

      xhr.onerror = reject;
      xhr.onabort = reject;
      xhr.ontimeout = reject;

      if (isGet || !options.data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }

  public get<T>(url: string, options?: Omit<Options<unknown>, 'data'>): Promise<unknown | T> {
    return this.request(url, { ...options, method: METHOD.GET });
  }

  public post<T, S>(url: string, options?: Options<S>): Promise<unknown | T> {
    return this.request(url, { ...options, method: METHOD.POST });
  }

  public put<T, S>(url: string, options?: Options<S>): Promise<unknown | T> {
    return this.request(url, { ...options, method: METHOD.PUT });
  }

  public patch<T, S>(url: string, options?: Options<S>): Promise<unknown | T> {
    return this.request(url, { ...options, method: METHOD.PATCH });
  }

  public delete<T, S>(url: string, options?: Options<S>): Promise<unknown | T> {
    return this.request(url, { ...options, method: METHOD.DELETE });
  }
}

export default HTTPClient;
