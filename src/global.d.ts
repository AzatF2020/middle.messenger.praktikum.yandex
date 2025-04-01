import Router from '@core/Router';
import Store from '@core/Store';

declare global {
  interface Window {
    store: Store;

    router: Router
  }
}
