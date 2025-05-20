import { PATHNAMES } from '@utils/constants/pagesPathnames';
import AuthAPI from '@api/authAPI.ts';
import type LoginModel from 'src/types/LoginModel';
import type SignupModel from 'src/types/SignupModel';

const authAPI = new AuthAPI();

interface IAuthController {
  login(data: LoginModel): void;

  signup(data: SignupModel): void;

  redirectUser(): void;
}

class AuthController implements IAuthController {
  public async login(data: LoginModel) {
    try {
      const { status } = await authAPI.login(data);

      if (status === 200) {
        window.router.go(PATHNAMES.MESSENGER);
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async signup(data: SignupModel) {
    try {
      const { status } = await authAPI.signup(data);

      if (status === 200) {
        window.router.go(PATHNAMES.MESSENGER);
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async redirectUser() {
    const currentLocation = window.router.currentLocation();

    try {
      window.store.setState({ loading: true });

      const { response } = await authAPI.getUser();

      if (currentLocation === PATHNAMES.LOGIN || currentLocation === PATHNAMES.SIGN_UP) {
        window.router.go(PATHNAMES.MESSENGER);
      }

      if (!window.store.getState().user) {
        window.store.setState({ user: JSON.parse(response) });
      }

      return JSON.parse(response);
    } catch {
      window.store.setState({ loading: true });

      if (currentLocation !== PATHNAMES.LOGIN && currentLocation !== PATHNAMES.SIGN_UP) {
        window.router.go(PATHNAMES.LOGIN);
      }
    } finally {
      window.store.setState({ loading: false });
    }
  }
}

export default AuthController;
