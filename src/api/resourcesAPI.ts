import { HTTPClient } from '@core/index.ts';

class ResourcesAPI {
  private readonly http: HTTPClient = new HTTPClient('/resources');

  public async uploadFile(data: FormData) {
    return await this.http.post('', { data });
  }
}

export default ResourcesAPI;
