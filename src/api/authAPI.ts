import { HTTPClient } from '@core/index.ts';
import type LoginModel from 'src/types/LoginModel';
import type SignupModel from 'src/types/SignupModel';

const http = new HTTPClient('/auth');

class AuthAPI {
  public login(data: LoginModel) {
    return http.post('/login', { data });
  }

  public signup(data: SignupModel) {
    return http.post('/signup', { data });
  }

  public getUser() {
    return http.get('/user');
  }
}

export default AuthAPI;
