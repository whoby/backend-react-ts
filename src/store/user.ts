import { observable, action } from 'mobx'

class UserStore {
    @observable userName: string
    @observable searchData: Object
    @observable userInfo: Object

    constructor() {
        this.userName = window.sessionStorage.getItem('userName') || 'admin'
        this.searchData = {}
        this.userInfo = {}
    }

    @action.bound
    saveUserName(data: string) {
        this.userName = data
        window.sessionStorage.setItem('userName', data)
    }

    @action.bound
    setSearchData(searchData: Object) {
        this.searchData = {
            ...searchData
        }
    }
}

const userStore = new UserStore()

export { userStore }
