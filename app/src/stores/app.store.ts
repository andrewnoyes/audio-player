import { action, observable, computed } from 'mobx';

const USERNAME = 'app.store.username';

export class AppStore {
    @observable
    public displayConnect: boolean = false;

    @observable
    public username: string = '';

    @computed
    public get userConnected() {
        return !!this.username;
    }

    constructor() {
        const previous = localStorage.getItem(USERNAME);
        if (previous) {
            this.connect(previous);
        }
    }

    public connect = (username: string) => {
        // TODO!
        this.username = username;
        localStorage.setItem(USERNAME, username);
    }

    @action
    public disconnect = () => {
        this.username = '';
        localStorage.removeItem(USERNAME);
    }
}

export default new AppStore();