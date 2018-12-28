import { observable, computed } from 'mobx';

import { client } from 'api';
import { pubsub, CHANNEL_USERS_RECEIVED } from 'pubsub';

export class ChannelStore {
    @observable
    public users: any[] = [];

    @computed
    public get hasConnectedUsers() {
        return this.users && this.users.length > 0;
    }

    constructor() {
        client.onUserConnected(this.onUserConnected);
        client.onUserDisconnected(this.onUserDisconnected);

        pubsub.subscribe(CHANNEL_USERS_RECEIVED, this.onChannelUsersReceived)
    }

    private onChannelUsersReceived = (_message: string, users: any[]) => {
        console.log('channel users received!!', users);
        this.users = users;
    }

    private onUserConnected = (user: any) => {
        console.log('a user connected!!!', user);
        this.users.push(user);
    }

    private onUserDisconnected = (user: any) => {
        console.log('a user disconnected!!!!', user);
        const userIndex = this.users.findIndex(u => u.id === user.id);
        if (userIndex >= 0) {
            this.users.splice(userIndex, 1);
        }
    }
}

export default new ChannelStore();