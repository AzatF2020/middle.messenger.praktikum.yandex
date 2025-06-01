import { HTTPClient } from '@core/index.ts';
import type LoginModel from 'src/types/LoginModel';
import type SignupModel from 'src/types/SignupModel';

class AuthAPI {
  private readonly http: HTTPClient = new HTTPClient('/auth');

  public async login(data: LoginModel): Promise<{ status: number; }> {
    return await this.http.post('/login', { data });
  }

  public async signup(data: SignupModel) {
    return await this.http.post('/signup', { data });
  }

  public async getUser() {
    return await this.http.get('/user');
  }

  public async logout() {
    return await this.http.post('/logout');
  }
}

export default AuthAPI;
