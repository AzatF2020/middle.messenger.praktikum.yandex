const initialState = () => ({
  user: null,
  loading: false,
  isChatLoading: false,
  userChats: [],
  search: '',
  searchedUserChats: [],
  chatId: -1,
  messages: [],
  token: null,
  selectedUser: {
    id: null,
    login: null,
    first_name: null,
    second_name: null,
    display_name: null,
    avatar: null,
    is_selected: false,
  },
});

export default initialState;
