import { HTTPClient } from '@core/index.ts';

const http = new HTTPClient('/chats');

class ChatsAPI {
  public async getChats() {
    return await http.get();
  }
}

export default ChatsAPI;
