import { HTTPClient } from '@core/index.ts';
import SearchUserModel from 'src/types/SearchUserModel';
import ProfileModel from 'src/types/ProfileModel';
import PasswordModel from 'src/types/PasswordModel';

const http = new HTTPClient('/user');

class UsersAPI {
  public async searchUser(data: SearchUserModel) {
    return await http.post('/search', { data });
  }

  public async uploadProfileAvatar(data: FormData) {
    return await http.put('/profile/avatar', { data });
  }

  public async updateProfile(data: ProfileModel) {
    return await http.put('/profile', { data });
  }

  public async updatePassword(data: PasswordModel) {
    return await http.put('/password', { data });
  }
}

export default UsersAPI;
