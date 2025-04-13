import { HTTPClient } from '@core/index.ts';

const http = new HTTPClient('/resources');

class ResourcesAPI {
  public async uploadFile(data: FormData) {
    return await http.post('', { data });
  }
}

export default ResourcesAPI;
