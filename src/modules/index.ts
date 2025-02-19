import Component from '@core/Component';
import { LoginForm } from './loginForm';
import { RegisterForm } from './registerForm';
import { Error } from './error';
import { ChatUsers } from './chatUsers';
import { ChatMessages } from './chatMessages';
import { ModalAddUser } from './modalAddUser';
import { ModalDeleteUser } from './modalDeleteUser';
import { Profile } from './profile';
import { ProfileEdit } from './profileEdit';
import { ProfileNewPassword } from './profileNewPassword';

const modules: Record<string, typeof Component> = {
    LoginForm,
    RegisterForm,
    ChatMessages,
    ModalAddUser,
    ModalDeleteUser,
    ProfileEdit,
    ChatUsers,
    Error,
    Profile,
    ProfileNewPassword
}

export default modules;
