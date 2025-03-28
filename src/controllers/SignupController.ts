import AuthAPI from '@api/authAPI';

const authAPI = new AuthAPI();

class SignupController {
  public signup() {
    authAPI.signup();
  }
}
