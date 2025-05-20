import Component from '@core/Component';
import { LoginForm } from './loginForm';
import { RegisterForm } from './registerForm';
import { Error } from './error';
import { ChatUsers } from './chatUsers';
import { ChatMessages } from './chatMessages';
import { ModalAddUser } from './modalAddUser';
import { ModalDeleteGroup } from './modalDeleteGroup';
import { Profile } from './profile';
import { ProfileEdit } from './profileEdit';
import { ProfileNewPassword } from './profileNewPassword';
import { LoaderOverlay } from './loaderOverlay';
import { UsersList } from './usersList';
import { ChatMessagesList } from './chatMessagesList';
import { GlobalLoader } from './globalLoader';
import { ModalCreateChat } from './modalCreateChat';
import { ModalSendMedia } from './modalSendMedia';
import { ModalImage } from './modalImage';
import { ModalChatInfo } from './modalChatInfo';
import { UsersAddList } from './usersAddList';
import { ModalDeleteUser } from './modalDeleteUser';

const modules: Record<string, typeof Component> = {
  ModalChatInfo,
  ModalDeleteUser,
  LoginForm: LoginForm as typeof Component,
  RegisterForm,
  ModalAddUser: ModalAddUser as typeof Component,
  ModalDeleteGroup: ModalDeleteGroup as typeof Component,
  ProfileEdit,
  ChatUsers,
  Error: Error as typeof Component,
  Profile,
  ProfileNewPassword,
  LoaderOverlay: LoaderOverlay as typeof Component,
  UsersList,
  ChatMessages,
  ChatMessagesList,
  GlobalLoader,
  ModalCreateChat,
  ModalSendMedia,
  ModalImage,
  UsersAddList,
};

export default modules;
