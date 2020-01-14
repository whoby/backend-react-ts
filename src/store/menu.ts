import { observable, action } from 'mobx'
import util from 'libs/util'

class MenuStore {
    @observable menu: Object;
    @observable breadNames: string[];
    @observable authToken: string;

    constructor() {
        this.menu = []
        this.breadNames = []
        this.authToken = util.cookie('sso_token') || ''
    }

    @action.bound
    saveMenu(data: Object) {
        this.menu = data
    }

    @action.bound
    saveBreadNames(data: string[]) {
        this.breadNames = data
    }

    @action.bound
    saveAuthToken(data: string) {
        this.authToken = data
        util.cookie('sso_token', data, { path: '/' })
    }
}

const menuStore = new MenuStore()

export { menuStore }
