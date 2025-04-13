import ResourcesAPI from '@api/resourcesAPI';
import UploadResourcesModel from 'src/types/uploadResourcesModel';

const resourcesAPI = new ResourcesAPI();

class ResourcesController {
  public async uploadFile(data: UploadResourcesModel) {
    let path = null;
    try {
      const { response } = await resourcesAPI.uploadFile(data);
      console.log(response);
      path = JSON.parse(response)?.path;
    } catch (error) {
      console.error(error);
    }
    return path;
  }
}

export default ResourcesController;
