import UsersAPI from '@api/usersAPI';
import SearchUserModel from 'src/types/SearchUserModel';

const usersAPI = new UsersAPI();

class UsersController {
  public async searchUser(data: SearchUserModel) {
    try {
      const { response } = await usersAPI.searchUser(data);
      window.store.setState({ searchedUserChats: JSON.parse(response) });
    } catch (error) {
      console.error(error);
    }
  }
}

export default UsersController;
