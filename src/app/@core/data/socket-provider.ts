export abstract class SocketProvider {
  abstract subscribe(endpoint: string, handler: any);

  abstract sendMessage(endpoint: string, data: any);

}
