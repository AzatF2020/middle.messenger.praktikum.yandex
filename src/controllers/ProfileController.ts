import AuthAPI from '@api/authAPI';
import UsersAPI from '@api/usersAPI';
import ProfileModel from 'src/types/ProfileModel';
import { PATHNAMES } from '@utils/constants/pagesPathnames';

const authAPI = new AuthAPI();
const usersAPI = new UsersAPI();

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

  public async updateProfile(data: ProfileModel, formData: FormData) {
    try {
      if (formData.get('avatar')) {
        const avatarResponse = await usersAPI.uploadProfileAvatar(formData);
        console.log(avatarResponse);
      }

      const response = await usersAPI.updateProfile(data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
}

export default ProfileController;
