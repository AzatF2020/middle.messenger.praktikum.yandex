import { HTTPClient } from '@core/index.ts';
import SearchUserModel from 'src/types/SearchUserModel';
import ProfileModel from 'src/types/ProfileModel';
import PasswordModel from 'src/types/PasswordModel';

class UsersAPI {
  private readonly http: HTTPClient = new HTTPClient('/user');

  public async searchUser(data: SearchUserModel) {
    return await this.http.post('/search', { data });
  }

  public async uploadProfileAvatar(data: FormData) {
    return await this.http.put('/profile/avatar', { data });
  }

  public async updateProfile(data: ProfileModel) {
    return await this.http.put('/profile', { data });
  }

  public async updatePassword(data: PasswordModel) {
    return await this.http.put('/password', { data });
  }
}

export default UsersAPI;
