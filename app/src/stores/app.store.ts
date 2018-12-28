import { action, observable, computed } from 'mobx';

import { client } from 'api';
import { pubsub, CHANNEL_USERS_RECEIVED } from 'pubsub';

export class AppStore {
    @observable
    public appConnected: boolean = false;

    @observable
    public username: string = '';

    @computed
    public get userConnected() {
        return !!this.username;
    }

    constructor() {
        client.onAppConnected(this.onAppConnected);
        client.onAppDisconnected(this.onAppDisconnected);
    }

    public connect = async (username: string) => {
        await this.connectUser(username);
    }

    public disconnect = () => {
        this.clearUsername();
        client.disconnectUser();
    }

    public updateUserSong = async (song: any) => {
        const response = await client.updateUser(song);
        if (!response.successful) {
            console.log('failed to update user', response.error);
        }
    }

    @action
    private setAppConnected = (connected: boolean) => {
        this.appConnected = connected;
    }

    @action
    private setUsername = (username: string) => {
        this.username = username;
    }

    @action
    private clearUsername = () => {
        this.username = '';
    }

    private connectUser = async (username: string) => {
        const response = await client.connectUser(username);
        if (response.successful) {
            console.log('user connected');
            this.setUsername(username);

            pubsub.publish(CHANNEL_USERS_RECEIVED, response.users);
        }
    }

    private onAppConnected = async () => {
        this.setAppConnected(true);
    }

    private onAppDisconnected = () => {
        this.setAppConnected(false);
    }
}

export default new AppStore();