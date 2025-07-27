import { expect } from 'chai';
import sinon from 'sinon';
import HTTPClient from '../HTTPClient.ts';

describe('HTTPClient', () => {
  const TEST_URL = '/test';
  const BASE_URL = 'https://ya-praktikum.tech/api/v2';
  let client: HTTPClient;

  beforeEach(() => {
    client = new HTTPClient('');
  });

  it('должен устанавливать правильный baseURL', () => {
    expect(new HTTPClient(TEST_URL)).to.have.property('baseURL', `${BASE_URL}${TEST_URL}`);
  });

  it('должен отправлять GET запрос', () => {
    // Исправленный вариант с приведением типов
    const requestStub = sinon.stub(client as any, '_request').resolves({});

    client.get(TEST_URL);

    sinon.assert.calledWith(
        requestStub as sinon.SinonStub,
        TEST_URL,
        sinon.match({ method: 'GET' }),
    );
    requestStub.restore();
  });

  it('должен отправлять POST запрос', () => {
    const requestStub = sinon.stub(client as any, '_request').resolves({});
    const testData = { name: 'Test' };

    client.post(TEST_URL, { data: testData });

    sinon.assert.calledWith(
        requestStub as sinon.SinonStub,
        TEST_URL,
        sinon.match({
          method: 'POST',
          data: testData,
        }),
    );
    requestStub.restore();
  });

  it('должен отправлять PUT запрос', () => {
    const requestStub = sinon.stub(client as any, '_request').resolves({});

    client.put(TEST_URL);

    sinon.assert.calledWith(
        requestStub as sinon.SinonStub,
        TEST_URL,
        sinon.match({ method: 'PUT' }),
    );
    requestStub.restore();
  });

  it('должен отправлять DELETE запрос', () => {
    const requestStub = sinon.stub(client as any, '_request').resolves({});

    client.delete(TEST_URL);

    sinon.assert.calledWith(
        requestStub as sinon.SinonStub,
        TEST_URL,
        sinon.match({ method: 'DELETE' }),
    );
    requestStub.restore();
  });
});
