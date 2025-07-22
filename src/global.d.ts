import Toast from './utils/classes/Toast';
import Router from './core/Router';
import Store from './core/Store';

declare global {
  interface Window {
    store: Store;

    router: Router;

    toast: Toast;
  }

  namespace NodeJS {
    interface Global {
      store: Store;
    }
  }
}
