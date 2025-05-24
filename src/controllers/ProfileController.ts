import { PATHNAMES } from '@utils/constants/pagesPathnames';
import AuthAPI from '@api/authAPI';
import UsersAPI from '@api/usersAPI';
import ProfileModel from 'src/types/ProfileModel';
import PasswordModel from 'src/types/PasswordModel';

const authAPI = new AuthAPI();
const usersAPI = new UsersAPI();

class ProfileController {
  public async logout() {
    try {
      const { status } = await authAPI.logout() as { status: number };

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
        await usersAPI.uploadProfileAvatar(formData);

        window.toast.addToast({
          life: 5000,
          summary: 'Настройка профиля',
          severity: 'info',
          detail: 'Аватар успешно обновлен',
          horizontalDirection: 'center',
        });
      }

      await usersAPI.updateProfile(data);

      window.toast.addToast({
        life: 5000,
        summary: 'Настройка профиля',
        severity: 'info',
        detail: 'Данные успешно обновлены',
        horizontalDirection: 'center',
      });
    } catch (error) {
      console.error(error);
    }
  }

  public async updatePassword(data: PasswordModel) {
    try {
      await usersAPI.updatePassword(data) as { response: any };

      window.toast.addToast({
        life: 5000,
        summary: 'Настройка профиля',
        severity: 'info',
        detail: 'Пароль успешно обновлен',
        horizontalDirection: 'center',
      });
    } catch (error) {
      window.toast.addToast({
        life: 5000,
        summary: 'Настройка профиля',
        severity: 'error',
        detail: (error as { reason?: string })?.reason ?? '',
        horizontalDirection: 'center',
      });
      throw new Error((error as { reason?: string })?.reason ?? String(error));
    }
  }
}

export default ProfileController;
