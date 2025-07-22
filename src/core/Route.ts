import render from './render.ts';
import Component from './Component.ts';

interface IRoute {
  navigate(pathname: string): void

  leave(): void

  match(pathname: string): boolean

  render(): void
}

type RouteProps = {
  pathname: string;
  view: typeof Component
}

class Route implements IRoute {
  public pathname;

  public view;

  public block: Component | null = null;

  constructor({ pathname, view }: RouteProps) {
    this.pathname = pathname;
    this.view = view;
  }

  public navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  public leave() {
    if (this.block) {
      this.block = null;
    }
  }

  public match(pathname: string): boolean {
    return this.pathname.trim() === pathname.trim();
  }

  public render() {
    if (!this.block) {
      this.block = new this.view!();
      render(this.block!);
      return;
    }
    // show
  }
}

export default Route;
