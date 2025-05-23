import Router from '@core/Router';
import Store from '@core/Store';
import Toast from '@utils/classes/Toast';

declare global {
  interface Window {
    store: Store;

    router: Router;

    toast: Toast;
  }
}
