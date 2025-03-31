import AuthAPI from '@api/authAPI';
import type SignupModel from 'src/types/SignupModel';

const authAPI = new AuthAPI();

class SignupController {
  public signup(data: SignupModel) {
    authAPI.signup(data)
      .then(() => {

      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export default SignupController;
