import { PATHNAMES } from '@utils/constants/pagesPathnames';
import AuthAPI from '@api/authAPI.ts';
import { HTTP_STATUS } from '@utils/constants/httpStatus';
import type LoginModel from 'src/types/LoginModel';
import type SignupModel from 'src/types/SignupModel';

interface IAuthController {
  login(data: LoginModel): void;

  signup(data: SignupModel): void;

  redirectUser(): void;
}

type TError = {
  reason: string;
}

class AuthController implements IAuthController {
  private readonly authAPI = new AuthAPI();

  public async login(data: LoginModel) {
    try {
      const { status } = await this.authAPI.login(data);

      if (status === HTTP_STATUS.OK) {
        window.router.go(PATHNAMES.MESSENGER);
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async signup(data: SignupModel) {
    try {
      const { status } = await this.authAPI.signup(data) as { status: number };

      if (status === HTTP_STATUS.OK) {
        window.router.go(PATHNAMES.MESSENGER);
      }
    } catch (error: unknown) {
      window.toast.addToast({
        life: 5000,
        summary: 'Ошибка',
        severity: 'error',
        horizontalDirection: 'center',
        detail: (error as TError)?.reason ?? '',
      });
    }
  }

  public async redirectUser() {
    const currentLocation = window.router.currentLocation();

    try {
      window.store.setState({ loading: true });

      const result = await this.authAPI.getUser();
      const { response } = (result as { response: string });

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
    return null;
  }
}

export default AuthController;
