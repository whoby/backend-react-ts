import { observable, action } from 'mobx'

class UserStore {
    @observable userName: string
    @observable userInfo: Record<string, any>

    constructor() {
        this.userName = window.sessionStorage.getItem('userName') || 'admin'
        this.userInfo = {}
    }

    @action.bound
    saveUserName(data: string): void {
        this.userName = data
        window.sessionStorage.setItem('userName', data)
    }
}

const userStore = new UserStore()

export { userStore }
