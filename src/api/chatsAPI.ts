import { HTTPClient } from '@core/index.ts';
import type { CreateChatModel, AddUsersToChatModel } from 'src/types/chatModels';

const http = new HTTPClient('/chats');

class ChatsAPI {
  public async getChats() {
    return await http.get();
  }

  public async getUsersChat(id: number) {
    return await http.get(`/${id}/users`);
  }

  public async getUserChatMessages(chatId: number) {
    return await http.get(`/${chatId}/common`);
  }

  public async createChat(data: CreateChatModel) {
    return await http.post('', { data });
  }

  public async createChatToken(chatId: number) {
    return await http.post(`/token/${chatId}`);
  }

  public async deleteChat(chatId: number) {
    return await http.delete('', { data: { chatId } });
  }

  public async addUsersToChat(data: AddUsersToChatModel) {
    return await http.put('/users', { data });
  }
}

export default ChatsAPI;
