import Store from '@core/Store';

declare global {
  interface Window {
    store: Store
  }
}
