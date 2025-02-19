import Component from "@core/Component";
import './style.scss';

class Index extends Component {
    render() {
        return `
            <div class="container--centered pages">
                <main>
                    <h1 class="heading-6 pages__title">Страницы</h1>
                    <ul class="pages__list">
                        <li>
                            <a class="link text-4" href="/login">Авторизация</a>
                        </li>
                        <li>
                            <a class="link text-4" href="/register">Регистрация</a>
                        </li>
                        <li>
                            <a class="link text-4" href="/chats">Список чатов</a>
                        </li>
                        <li>
                            <a class="link text-4" href="/profile">Профиль</a>
                        </li>
                        <li>
                            <a class="link text-4" href="/profile-change-data">Форма профиля</a>
                        </li>
                        <li>
                            <a class="link text-4" href="/profile-new-password">Новый пароль</a>
                        </li>
                        <li>
                            <a class="link text-4" href="/not-found">404</a>
                        </li>
                        <li>
                            <a class="link text-4" href="/server-error">500</a>
                        </li>
                    </ul>
                </main>
            </div>
        `;
    }
}

export default Index
