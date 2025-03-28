import AuthAPI from '@api/authAPI.ts';

const authAPI = new AuthAPI();

class LoginController {
  public login() {
    authAPI.login()
      .then(({ response }) => {
        console.log(JSON.parse(response));
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default LoginController;
