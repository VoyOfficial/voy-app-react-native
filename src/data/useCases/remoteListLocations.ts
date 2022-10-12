import { HttpGetClient } from '../http';

export default class RemoteListLocations {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
  ) {}

  async list(): Promise<void> {
    await this.httpGetClient.get(this.url);
  }
}
