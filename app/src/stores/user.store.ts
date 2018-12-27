import { action, observable } from 'mobx';

export class UserStore {
    @observable
    public displayConnect: boolean = false;

    @action
    public toggleDisplayConnect = () => {
        this.displayConnect = !this.displayConnect;
    }
}

export default new UserStore();