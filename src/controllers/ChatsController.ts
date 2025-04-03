import ChatsAPI from '@api/chatsAPI';
import { PATHNAMES } from '@utils/constants/pagesPathnames';
import type { CreateChatModel, AddUsersToChatModel } from 'src/types/chatModels';
import initialState from '@utils/constants/initialState';

const chatsAPI = new ChatsAPI();

interface IChatsController {
  getChats(): void
}

class ChatsController implements IChatsController {
  public async getChats() {
    try {
      const { response } = await chatsAPI.getChats();
      window.store.setState({ userChats: JSON.parse(response) });
    } catch (error) {
      console.error(error);
    }
  }

  public async createChat(createChatModel: CreateChatModel, users: number[]) {
    try {
      const { response } = await chatsAPI.createChat(createChatModel);

      const chatId = JSON.parse(response).id;

      await chatsAPI.addUsersToChat({ chatId, users });

      const { response: responseChats } = await chatsAPI.getChats();

      window.store.setState({ userChats: JSON.parse(responseChats), search: '' });
    } catch (error) {
      console.error(error);
    }
  }

  public async deleteChat() {
    const { chatId } = window.store.getState();

    try {
      await chatsAPI.deleteChat(chatId as number);

      window.router.go(PATHNAMES.MESSENGER);

      window.store.setState({ selectedUser: initialState().selectedUser });

      const { response } = await chatsAPI.getChats();
      window.store.setState({ userChats: JSON.parse(response) });
    } catch (error) {
      console.error(error);
    }
  }

  public async getChatUsers(chatId: number) {
    try {
      window.store.setState({ chatId });

      const { response } = await chatsAPI.getUsersChat(chatId);

      const myId = window.store.getState().user.id;

      /* Получаем пользователя, *добавленного в чат и кладем в хранилище. (Работает только с 2-мя пользователями) */
      const candidate = JSON.parse(response).find(({ id: candidateId }: {id: number }) => candidateId !== myId);

      window.router.go('/messenger', candidate.login);

      window.store.setState({ selectedUser: { ...candidate, is_selected: true } });
    } catch (error) {
      console.error(error);
    }
  }
}

export default ChatsController;
