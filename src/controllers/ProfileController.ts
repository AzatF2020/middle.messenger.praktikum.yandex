import AuthAPI from '@api/authAPI';
import { PATHNAMES } from '@utils/constants/pagesPathnames';

const authAPI = new AuthAPI();

class ProfileController {
  public async logout() {
    try {
      const { status } = await authAPI.logout();

      if (status === 200) {
        window.router.go(PATHNAMES.LOGIN);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default ProfileController;
