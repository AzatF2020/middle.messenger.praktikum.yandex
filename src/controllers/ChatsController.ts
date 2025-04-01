import ChatsAPI from '@api/chatsAPI';

const chatsAPI = new ChatsAPI();

interface IChatsController {
  getChats(): Promise<any[]>
}

class ChatsController implements IChatsController {
  public async getChats() {
    let chats = [];
    try {
      const { response } = await chatsAPI.getChats();
      console.log(response);
      chats = JSON.parse(response);
    } catch (error) {
      console.error(error);
    }
    return chats;
  }
}

export default ChatsController;
