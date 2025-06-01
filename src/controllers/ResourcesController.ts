import ResourcesAPI from '@api/resourcesAPI';

class ResourcesController {
  private readonly resourcesAPI = new ResourcesAPI();

  public async uploadFile(data: FormData) {
    let id = null;
    try {
      const result = await this.resourcesAPI.uploadFile(data) as { response: string };
      id = JSON.parse(result.response)?.id;
    } catch (error) {
      console.error(error);
    }
    return id;
  }
}

export default ResourcesController;
