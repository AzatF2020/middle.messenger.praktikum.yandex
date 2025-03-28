import { HTTPClient } from '@core/index.ts';

const http = new HTTPClient('/auth');

class AuthAPI {
  public login() {
    return http.post('/login');
  }
}

export default AuthAPI;
