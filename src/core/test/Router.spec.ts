import { expect } from 'chai';
import Component from '../Component.ts';
import Router from '../Router.ts';

const createRouter = () => new Router();

class TestBlock extends Component {
  render() {
    return '<div>Hello world</div>';
  }
}

describe('Router', () => {
  const firstLocation = '/test';
  const secondLocation = '/second-test';

  let router: Router;

  beforeEach(() => {
    router = createRouter();
    router.use('*', TestBlock);
  });

  it('Создание экземпляра Router', () => {
    expect(router).to.be.instanceof(

      Router
    );
  });

  it('Возвращает тот же экземпляр при многократном вызове Router', () => {
    const newRouterInstance = createRouter();
    expect(router).to.be.equal(newRouterInstance);
  });

  it('Добавляет новый маршрут', () => {
    router.use(firstLocation, TestBlock);

    const route = router.getRoute(firstLocation);

    expect(route.pathname).to.equal(firstLocation);
  });

  it('Добавляет новый маршрут с переходом (метод go)', () => {
    router.use(firstLocation, TestBlock);
    router.go(firstLocation);

    const currentfirstLocation = router.currentLocation();

    expect(firstLocation).to.equal(currentfirstLocation);
  });

  it('Добавляет новый маршрут c возвращанием назад (метод back)', (done) => {
    router.use(firstLocation, TestBlock);
    router.use(secondLocation, TestBlock);

    router.go(firstLocation);
    router.go(secondLocation);

    expect(router.currentLocation()).to.equal(secondLocation);

    router.back();

    const timeout = setTimeout(() => {
      expect(router.currentLocation()).to.equal(firstLocation);
      done();
      clearTimeout(timeout);
    }, 50);
  });

  it("Получение hash'a c URL", () => {
    router.use(firstLocation, TestBlock);
    router.go(`${firstLocation}#with-hash`);

    expect(router.getHash()).to.equal('with-hash');
  });

  it('Возвращает 404 страницу для несуществующего роута', () => {
    const route = router.getRoute('/foo-bar');

    expect(route.pathname).to.equal('*');
  });
});
