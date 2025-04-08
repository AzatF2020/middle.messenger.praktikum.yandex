import WSTransport from '@core/WSTransport';
import ChatsAPI from '@api/chatsAPI';
import { PATHNAMES } from '@utils/constants/pagesPathnames';
import type { CreateChatModel } from 'src/types/chatModels';
import initialState from '@utils/constants/initialState';
import decodeURI from '@utils/constants/decodeURI';

const chatsAPI = new ChatsAPI();
const wssInstance = new WSTransport(import.meta.env.VITE_BACKEND_WS);

interface IChatsController {
  getChats(): void
}

class ChatsController implements IChatsController {
  private openChatWithHashOnMount(chats) {
    if (PATHNAMES.MESSENGER !== window.router.currentLocation()) return;

    const hash = window.router.getHash();

    if (!hash) return;

    const chatId = chats.find(({ title }: { title: string }) => title === decodeURI(hash))?.id;

    if (!chatId) return;

    this.openHandleChat(chatId);
  }

  public async getChats() {
    try {
      const { response } = await chatsAPI.getChats();

      const parsedResponse = JSON.parse(response);

      window.store.setState({ userChats: JSON.parse(response) });

      this.openChatWithHashOnMount(parsedResponse);
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

      await this.openHandleChat(chatId);
    } catch (error) {
      console.error(error);
    }
  }

  public async deleteChat() {
    const { chatId } = window.store.getState();

    try {
      await chatsAPI.deleteChat(chatId as number);

      window.router.go(PATHNAMES.MESSENGER);

      const { response } = await chatsAPI.getChats();

      window.store.setState({
        userChats: JSON.parse(response),
        selectedUser: initialState().selectedUser,
        messages: [],
      });
    } catch (error) {
      console.error(error);
    }
  }

  public async openHandleChat(chatId: number) {
    if (window.store.getState().chatId === chatId) {
      return;
    }

    try {
      window.store.setState({ isChatLoading: true });

      const { response } = await chatsAPI.getUsersChat(chatId);
      // const { response: responseMessages } = await chatsAPI.getUserChatMessages(chatId);
      const { response: responseToken } = await chatsAPI.createChatToken(chatId);

      const myId = window.store.getState().user.id;
      const token = JSON.parse(responseToken)?.token;

      /* Получаем пользователя, *добавленного в чат и кладем в хранилище. (Работает только до 2-мя пользователей) */
      const candidate = JSON.parse(response).find(({ id: candidateId }: {id: number }) => candidateId !== myId);

      window.router.go('/messenger', candidate.login);

      document.title = candidate.login;

      wssInstance.connectToSocket({
        chatId,
        userId: myId,
        token,
      });

      window.store.setState({
        chatId,
        selectedUser: { ...candidate, is_selected: true, chatId },
        messages: [],
        token,
        message: '',
      });
    } catch (error) {
      window.store.setState({ isChatLoading: true });
      console.error(error);
    } finally {
      window.store.setState({ isChatLoading: false });
    }
  }
}

export default ChatsController;
