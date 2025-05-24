import ResourcesAPI from '@api/resourcesAPI';

const resourcesAPI = new ResourcesAPI();

class ResourcesController {
  public async uploadFile(data: FormData) {
    let id = null;
    try {
      const result = await resourcesAPI.uploadFile(data) as { response: string };
      id = JSON.parse(result.response)?.id;
    } catch (error) {
      console.error(error);
    }
    return id;
  }
}

export default ResourcesController;
