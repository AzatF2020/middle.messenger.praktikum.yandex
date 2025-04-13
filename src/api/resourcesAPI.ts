import { HTTPClient } from '@core/index.ts';
import type UploadResourcesModel from 'src/types/uploadResourcesModel';

const http = new HTTPClient('/resources');

class ResourcesAPI {
  public async uploadFile(data: UploadResourcesModel) {
    return await http.post('', { data });
  }
}

export default ResourcesAPI;
