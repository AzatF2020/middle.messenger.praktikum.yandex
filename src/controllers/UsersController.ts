import UsersAPI from '@api/usersAPI';
import SearchUserModel from 'src/types/SearchUserModel';

const usersAPI = new UsersAPI();

class UsersController {
  public async searchUser(data: SearchUserModel) {
    let result = [];
    try {
      const { response } = await usersAPI.searchUser(data);
      result = JSON.parse(response);
    } catch (error) {
      console.error(error);
    }
    return result;
  }
}

export default UsersController;
