import { HTTPClient } from '@core/index.ts';

const http = new HTTPClient('/auth');

class AuthAPI {
  public login() {
    return http.post('/login');
  }

  public signup() {
    return http.post('/signup');
  }
}

export default AuthAPI;
