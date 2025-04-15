const initialState = () => ({
  user: null,
  loading: false,
  isChatLoading: false,
  userChats: [],
  searchedUserChats: [],
  searchedUserForAdd: [],
  search: '',
  chatId: 0,
  messages: [],
  token: null,
  selectedChat: {
    id: null,
    title: null,
    avatar: null,
    created_by: null,
    unread_count: null,
    last_message: null,
    is_selected: false,
    members: [],
  },
  selectedUserOnSearch: {
    id: null,
    display_name: null,
    first_name: null,
    login: null,
    avatar: null,
  },
});

export default initialState;
