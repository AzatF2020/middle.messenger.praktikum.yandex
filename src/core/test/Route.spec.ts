import { expect } from 'chai';
import Route from '../Route.ts';
import Component from '../Component.ts';

// Имитация Component
class TestBlock extends Component {
  render() {
    return '<div class="test">Hello world</div>';
  }
}

const createRoute = (pathname: string, view: typeof Component | null) => new Route({ pathname, view });

describe('Route', () => {
  let component: typeof Component | null;

  before(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  beforeEach(() => {
    component = TestBlock;

    document.body.innerHTML = '<div id="app"></div>';
  });

  afterEach(() => {
    component = null;
  });

  it('Создание экземпляра Route', () => {
    const route = createRoute('/test', component);

    expect(route).to.be.an.instanceof(Route);
  });

  it('Сравнивает путей с помощью match', () => {
    const route = createRoute('/test', component);

    expect(route.match('/test')).to.be.true;
    expect(route.match('/other')).to.be.false;
  });

  it('Переключает отображения с помощью navigate', (done) => {
    const route = createRoute('/test', component);

    route.render();

    expect(route.match('/test')).to.be.true;

    const timeout = setTimeout(() => {
      const content = document.querySelector('.test') as HTMLElement;

      expect(content.innerHTML).to.equal('Hello world');

      route.navigate('/other');

      expect(route.match('/other')).to.be.false;

      clearTimeout(timeout);
      done();
    }, 50);
  });
});
