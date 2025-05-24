import { PATHNAMES } from '@utils/constants/pagesPathnames';
import Component from './Component';
import Route from './Route';

interface IRouter {
  use(pathname: string, block: typeof Component): void;

  go(pathname: string, hash: string): void;

  back(): void;

  currentLocation(): string;

  getHash(): string;

  start(): void;
}

class Router implements IRouter {
  static __instance__: Router;

  private _currentRoute: Route | null = null;

  public routes;

  public history;

  constructor() {
    if (Router.__instance__) {
      return Router.__instance__;
    }

    this.routes = [];
    this.history = window.history;

    Router.__instance__ = this;
  }

  private _isRouteExist(pathname: string) {
    if (!Object.values(PATHNAMES).find((x: string) => x === pathname)) {
      this.go(PATHNAMES.NOT_FOUND)
    }
  }

  private _onRoute(pathname: string) {
    const route = this._getRoute(pathname);

    if (!route) {
      this._isRouteExist(pathname)
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
  }

  private _getRoute(pathname: string): Route {
    return this.routes?.find((route: Route) => route.match(pathname));
  }

  public use(pathname: string, block: typeof Component) {
    const route = new Route({ pathname, view: block });

    this.routes!.push(route);

    return this;
  }

  public go(pathname: string, hash?: string) {
    const url = new URL(`${window.location.origin}${pathname}`);

    if (hash) {
      url.hash = hash;
    }

    this.history!.pushState({}, '', url);

    this._onRoute(pathname);
  }

  public back() {
    this.history!.back();
  }

  public currentLocation(): string {
    return window.location.pathname;
  }

  public getHash() {
    return window.location.hash.slice(1);
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }
}

export default Router;
