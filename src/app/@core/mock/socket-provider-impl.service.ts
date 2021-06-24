import { Injectable } from '@angular/core';
import {SocketProvider} from "../data/socket-provider";
import {environment} from "../../../environments/environment";
import SockJS from 'sockjs-client';
import { Client, Message } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class SocketProviderImplService extends SocketProvider{

  private stompClient = null;

  constructor() {
    super();
    this.connect();
  }

  sendMessage(endpoint: string, data: any) {
    this.stompClient.send('/api/v1/topic/'+endpoint, {}, JSON.stringify(data));
  }

  subscribe(endpoint: string, handler: any) {
    this.stompClient.subscribe('/topic/'+endpoint, handler);
  }

  connect() {
    const socket = new SockJS('http://localhost:6542/api/v1/socket');
    this.stompClient = new Client();
    this.stompClient.brokerURL = 'ws://localhost:6542/api/v1/socket'
    /*this.stompClient.connect({}, function (frame) {
    });*/
    this.stompClient.activate();
  }
}
