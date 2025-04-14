import ResourcesAPI from '@api/resourcesAPI';

const resourcesAPI = new ResourcesAPI();

class ResourcesController {
  public async uploadFile(data: FormData) {
    let id = null;
    try {
      const { response } = await resourcesAPI.uploadFile(data);
      id = JSON.parse(response)?.id;
    } catch (error) {
      console.error(error);
    }
    return id;
  }
}

export default ResourcesController;
