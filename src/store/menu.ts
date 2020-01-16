import { observable, action } from 'mobx'
import util from '@/libs/util'

class MenuStore {
    @observable menu: Record<string, any>
    @observable breadNames: string[]
    @observable authToken: string

    constructor() {
        this.menu = []
        this.breadNames = []
        this.authToken = util.cookie('sso_token') || ''
    }

    @action.bound
    saveMenu(data: Record<string, any>): void {
        this.menu = data
    }

    @action.bound
    saveBreadNames(data: string[]): void {
        this.breadNames = data
    }

    @action.bound
    saveAuthToken(data: string): void {
        this.authToken = data
        util.cookie('sso_token', data, { path: '/' })
    }
}

const menuStore = new MenuStore()

export { menuStore }
