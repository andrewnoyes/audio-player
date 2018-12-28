import { action, observable, computed } from 'mobx';

import { client } from 'api';
import { pubsub, APP_CONNECTED, APP_DISCONNECTED } from 'pubsub';

const USERNAME = 'app.store.username';

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
        pubsub.subscribe(APP_CONNECTED, this.onAppConnected);
        pubsub.subscribe(APP_DISCONNECTED, this.onAppDisconnected);
    }

    public connect = async (username: string) => {
        await this.connectUser(username);
    }

    public disconnect = () => {
      this.clearUsername();
    }

    @action
    private setAppConnected = (connected: boolean) => {
        this.appConnected = connected;
    }

    @action
    private setUsername = (username: string) => {
        this.username = username;
        localStorage.setItem(USERNAME, username);
    }
    
    @action
    private clearUsername = () => {
        this.username = '';
        localStorage.removeItem(USERNAME);
    }

    private connectUser = async (username: string) => {
        const response = await client.connectUser(username);
        if (response.successful) {
            console.log('user connected');
            this.setUsername(username);
        }
    }

    private onAppConnected = async () => {
        // try to refresh "session" from localstorage
        const previous = localStorage.getItem(USERNAME);
        if (previous) {
            await this.connectUser(previous);
        }

        this.setAppConnected(true);
    }

    private onAppDisconnected = () => {
        this.setAppConnected(false);
    }
}

export default new AppStore();