import { expect } from 'chai';
import Router from '../Router.ts';

describe('Router', () => {
  let router: Router;

  beforeEach(() => {
    router = new Router();
  });

  it('Создание экземпляра Router', () => {
    expect(router).to.be.instanceof(Router);
  });
});
