import WSTransport from '@core/WSTransport';
import ChatsAPI from '@api/chatsAPI';
import { PATHNAMES } from '@utils/constants/pagesPathnames';
import type { CreateChatModel } from 'src/types/chatModels';
import initialState from '@utils/constants/initialState';
import decodeURI from '@utils/constants/decodeURI';

interface IChatsController {
  getChats(): void
}

class ChatsController implements IChatsController {
  private readonly chatsAPI = new ChatsAPI();

  private readonly wssInstance = new WSTransport(import.meta.env.VITE_BACKEND_WS);

  private openChatWithHashOnMount(chats: Array<{ id: number; title: string }>): void {
    if (PATHNAMES.MESSENGER !== window.router.currentLocation()) return;

    const hash: string = window.router.getHash();

    if (!hash) return;

    const chatId: number | undefined = chats.find(({ title }: { title: string }) => title === decodeURI(hash))?.id;

    if (!chatId) return;

    this.openHandleChat(chatId);
  }

  public async getChats() {
    try {
      const { response } = await this.chatsAPI.getChats() as { response: string };

      const parsedResponse = JSON.parse(response);

      window.store.setState({ userChats: JSON.parse(response) });

      this.openChatWithHashOnMount(parsedResponse);
    } catch (error) {
      console.error(error);
      window.toast.addToast({
        life: 5000,
        summary: 'Список',
        severity: 'error',
        detail: (error as { reason?: string })?.reason ?? '',
        horizontalDirection: 'center',
      });
    }
  }

  public async addUserToChat(users: number[], chatId: number) {
    try {
      await this.chatsAPI.addUsersToChat({ chatId, users });

      const { response: chatUsers } = await this.chatsAPI.getUsersChat(chatId) as { response: string };

      const currentChat = window.store.getState().selectedChat as object;

      window.store.setState({
        selectedChat: { ...currentChat, members: JSON.parse(chatUsers ?? '[]') },
      });

      window.toast.addToast({
        life: 5000,
        summary: 'Добавление пользователя',
        severity: 'info',
        detail: 'Пользователь успешно добавлен',
        horizontalDirection: 'center',
      });
    } catch (error) {
      window.toast.addToast({
        life: 5000,
        summary: 'Чат',
        severity: 'error',
        detail: (error as { reason?: string })?.reason ?? '',
        horizontalDirection: 'center',
      });
    }
  }

  public async removeUsersFromChat(users: number[], chatId: number) {
    try {
      await this.chatsAPI.removeUsersFromChat({ chatId, users });

      const { response: chatUsers } = await this.chatsAPI.getUsersChat(chatId) as { response: string };

      const currentChat = window.store.getState().selectedChat as object;

      window.store.setState({
        selectedChat: { ...currentChat, members: JSON.parse(chatUsers ?? '[]') },
      });

      window.toast.addToast({
        life: 5000,
        summary: 'Удаление пользователя',
        severity: 'info',
        detail: 'Пользователь успешно удален',
        horizontalDirection: 'center',
      });
    } catch (error) {
      window.toast.addToast({
        life: 5000,
        summary: 'Чат',
        severity: 'error',
        detail: (error as { reason?: string })?.reason ?? '',
        horizontalDirection: 'center',
      });
    }
  }

  public async createChat(createChatModel: CreateChatModel, users: number[]) {
    try {
      const { response } = await this.chatsAPI.createChat(createChatModel) as { response: string };

      const chatId = JSON.parse(response).id;

      await this.chatsAPI.addUsersToChat({ chatId, users });

      const { response: responseChats } = await this.chatsAPI.getChats() as { response: string };

      window.store.setState({ userChats: JSON.parse(responseChats), search: '' });

      await this.openHandleChat(chatId);
    } catch (error) {
      window.toast.addToast({
        life: 5000,
        summary: 'Чат',
        severity: 'error',
        detail: (error as { reason?: string })?.reason ?? '',
        horizontalDirection: 'center',
      });
    }
  }

  public async deleteChat() {
    const { chatId } = window.store.getState();

    try {
      await this.chatsAPI.deleteChat(chatId as number);

      window.router.go(PATHNAMES.MESSENGER);

      const { response } = await this.chatsAPI.getChats() as { response: string };

      window.store.setState({
        userChats: JSON.parse(response),
        selectedChat: initialState().selectedChat,
        messages: [],
      });

      window.toast.addToast({
        life: 5000,
        summary: 'Удаление чата',
        severity: 'info',
        detail: 'Чат успешно удален',
        horizontalDirection: 'center',
      });
    } catch (error) {
      window.toast.addToast({
        life: 5000,
        summary: 'Чат',
        severity: 'error',
        detail: (error as { reason?: string })?.reason ?? '',
        horizontalDirection: 'center',
      });
    }
  }

  public async sendChatMessage(content: string) {
    this.wssInstance.send({ content });

    window.store.setState({ message: '' });
  }

  public async sendChatFile(content: string) {
    this.wssInstance.send({ type: 'file', content });
  }

  public async openHandleChat(chatId: number) {
    if (window.store.getState().chatId === chatId) {
      return;
    }

    this.wssInstance.leave();

    try {
      window.store.setState({ isChatLoading: true });

      const { response: chatUsers } = await this.chatsAPI.getUsersChat(chatId) as { response: string };
      const { response: responseToken } = await this.chatsAPI.createChatToken(chatId) as { response: string };

      const state = window.store.getState() as { user: { id: number } };
      const myId = state.user.id;
      const token = JSON.parse(responseToken)?.token;

      /* Получаем чат и кладем в хранилище. */
      const userChats = window.store.getState().userChats as Array<{ id: number; title: string }>;
      const currentChatInfo = userChats.find(({ id }: { id: number }) => id === chatId);

      if (!currentChatInfo) {
        throw new Error(`Chat with id ${chatId} not found`);
      }

      window.router.go('/messenger', currentChatInfo.title);

      document.title = currentChatInfo.title;

      this.wssInstance.connectToSocket({
        chatId,
        userId: myId,
        token,
      });

      window.store.setState({
        chatId,
        selectedChat: { ...currentChatInfo, members: JSON.parse(chatUsers ?? '[]'), is_selected: true },
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
