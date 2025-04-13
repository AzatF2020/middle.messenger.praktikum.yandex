import ResourcesAPI from '@api/resourcesAPI';

const resourcesAPI = new ResourcesAPI();

class ResourcesController {
  public async uploadFile(data: FormData) {
    let path = null;
    try {
      const { response } = await resourcesAPI.uploadFile(data);
      path = JSON.parse(response)?.id;
    } catch (error) {
      console.error(error);
    }
    return path;
  }
}

export default ResourcesController;
