import axios from 'axios';
import * as io from 'socket.io-client';

import { pubsub, APP_CONNECTED, APP_DISCONNECTED } from 'pubsub';
import { API_URL } from './config';

export class Client {
    private readonly socket: SocketIOClient.Socket;

    constructor() {
        this.socket = io(API_URL);
        this.socket.on('connect', this.onConnected);
        this.socket.on('disconnect', this.onDisconnected);
    }

    public uploadSong = async (file: any) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${API_URL}/songs`, formData);
        return response.data;
    }

    public fetchSongs = async () => {
        const response = await axios.get(`${API_URL}/songs`);
        return response.data;
    }

    public connectUser = (username: string) => {
        return this.emit('user:connect', { username });
    }

    public onUserConnected = (fn: Function) => {
        this.socket.on('user:connected', fn);
    }

    private emit = async (action: string, data?: any): Promise<any> => {
        return new Promise(
            (resolve, reject) => {
                try {
                    this.socket.emit(action, data, (result: any) => {
                        resolve(result);
                    });
                } catch (error) {
                    reject(error);
                }
            }
        )
    }

    private onConnected = () => {
        console.log('socket connected');
        pubsub.publish(APP_CONNECTED, null);
    }

    private onDisconnected = () => {
        console.log('socket disconnected');
        pubsub.publish(APP_DISCONNECTED, null);
    }
}

export default new Client();