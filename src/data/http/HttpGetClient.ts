export default interface HttpGetClient {
  get(url: string): Promise<void>;
}
