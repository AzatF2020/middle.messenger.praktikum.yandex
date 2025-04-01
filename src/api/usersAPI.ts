import { HTTPClient } from '@core/index.ts';
import SearchUserModel from 'src/types/SearchUserModel';

const http = new HTTPClient('/user');

class UsersAPI {
  public async searchUser(data: SearchUserModel) {
    return await http.post('/search', { data });
  }
}

export default UsersAPI;
