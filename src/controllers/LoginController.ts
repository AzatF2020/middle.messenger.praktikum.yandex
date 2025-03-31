import AuthAPI from '@api/authAPI.ts';
import type LoginModel from 'src/types/LoginModel';

const authAPI = new AuthAPI();

class LoginController {
  public login(data: LoginModel) {
    authAPI.login(data)
      .then(() => {
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default LoginController;
