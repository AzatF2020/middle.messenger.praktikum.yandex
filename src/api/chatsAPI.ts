import { HTTPClient } from '@core/index.ts';
import type { CreateChatModel, AddUsersToChatModel, RemoveUsersFromChatModel } from 'src/types/chatModels';

class ChatsAPI {
  private readonly http: HTTPClient = new HTTPClient('/chats');

  public async getChats() {
    return await this.http.get();
  }

  public async getUsersChat(id: number) {
    return await this.http.get(`/${id}/users`);
  }

  public async getUserChatMessages(chatId: number) {
    return await this.http.get(`/${chatId}/common`);
  }

  public async createChat(data: CreateChatModel) {
    return await this.http.post('', { data });
  }

  public async createChatToken(chatId: number) {
    return await this.http.post(`/token/${chatId}`);
  }

  public async deleteChat(chatId: number) {
    return await this.http.delete('', { data: { chatId } });
  }

  public async addUsersToChat(data: AddUsersToChatModel) {
    return await this.http.put('/users', { data });
  }

  public async removeUsersFromChat(data: RemoveUsersFromChatModel) {
    return await this.http.delete('/users', { data });
  }
}

export default ChatsAPI;
