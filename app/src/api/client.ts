import axios from 'axios';
import * as io from 'socket.io-client';

import { API_URL } from './config';

export class Client {
    private readonly socket: SocketIOClient.Socket;

    constructor() {
        this.socket = io(API_URL);
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

    public disconnectUser = () => {
        return this.emit('user:disconnect');
    }

    public onUserConnected = (fn: Function) => {
        this.socket.on('user:connected', fn);
    }

    public onUserDisconnected = (fn: Function) => {
        this.socket.on('user:disconnected', fn);
    }

    public onAppConnected = (fn: Function) => {
        this.socket.on('connect', fn);
    }

    public onAppDisconnected = (fn: Function) => {
        this.socket.on('disconnect', fn);
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

}

export default new Client();