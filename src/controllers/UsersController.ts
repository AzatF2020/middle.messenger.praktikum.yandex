import UsersAPI from '@api/usersAPI';
import SearchUserModel from 'src/types/SearchUserModel';

class UsersController {
  private readonly usersAPI = new UsersAPI();

  public async searchUser(data: SearchUserModel) {
    try {
      const result = await this.usersAPI.searchUser(data) as { response: string };
      const { response } = result;
      window.store.setState({ searchedUserChats: JSON.parse(response), searchLoading: true });
    } catch (error) {
      console.error(error);
      window.store.setState({ searchLoading: true });
    } finally {
      window.store.setState({ searchLoading: false });
    }
  }

  public async searchUserForAdd(data: SearchUserModel) {
    try {
      const { response } = await this.usersAPI.searchUser(data) as { response: string };
      window.store.setState({ searchedUserForAdd: JSON.parse(response) });
    } catch (error) {
      console.error(error);
    }
  }
}

export default UsersController;
