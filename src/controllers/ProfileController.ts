import { PATHNAMES } from '@utils/constants/pagesPathnames';
import { HTTP_STATUS } from '@utils/constants/httpStatus';
import AuthAPI from '@api/authAPI';
import UsersAPI from '@api/usersAPI';
import ProfileModel from 'src/types/ProfileModel';
import PasswordModel from 'src/types/PasswordModel';

class ProfileController {
  private readonly authAPI = new AuthAPI();

  private readonly usersAPI = new UsersAPI();

  public async logout() {
    try {
      const { status } = await this.authAPI.logout() as { status: number };

      if (status === HTTP_STATUS.OK) {
        window.router.go(PATHNAMES.LOGIN);
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async updateProfile(data: ProfileModel, formData: FormData) {
    try {
      if (formData.get('avatar')) {
        await this.usersAPI.uploadProfileAvatar(formData);

        window.toast.addToast({
          life: 5000,
          summary: 'Настройка профиля',
          severity: 'info',
          detail: 'Аватар успешно обновлен',
          horizontalDirection: 'center',
        });
      }

      await this.usersAPI.updateProfile(data);

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
      await this.usersAPI.updatePassword(data) as { response: unknown };

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
