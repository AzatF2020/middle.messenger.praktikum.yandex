type CreateChatModel = {
  title: string;
}

type AddUsersToChatModel = {
  chatId: number;
  users: number[];
}

type RemoveUsersFromChatModel = {
  chatId: number;
  users: number[];
}

export type {
  CreateChatModel,
  AddUsersToChatModel,
  RemoveUsersFromChatModel,
};
