import { HTTPClient } from '@core/index.ts';
import type LoginModel from 'src/types/LoginModel';
import type SignupModel from 'src/types/SignupModel';

const http = new HTTPClient('/auth');

class AuthAPI {
  public async login(data: LoginModel): Promise<{ status: number; }> {
    return await http.post('/login', { data });
  }

  public async signup(data: SignupModel) {
    return await http.post('/signup', { data });
  }

  public async getUser() {
    return await http.get('/user');
  }

  public async logout() {
    return await http.post('/logout');
  }
}

export default AuthAPI;
