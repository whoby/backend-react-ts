import React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'

@inject('menuStore') @observer

class SideMenu extends React.Component<any, any> {
    readonly state: Readonly<any>

    constructor(props: any) {
        super(props)
        this.state = {
            sideMenu: [],
            openKeys: [],
            selectedKeys: []
        }
    }

    private store: any = this.props.menuStore

    // 临时变量
    private stack: any = {
        flag: false,
        openKeys: [],
        breadNames: [],
    }

    componentWillMount() {
        this.initMenuData()
    }

    // 根据路由siderbar重新渲染
    shouldComponentUpdate(nextProps: any) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.stack = {
                flag: false,
                openKeys: [],
                breadNames: [],
            }
            this.initMenuData(nextProps.location.pathname)
        }
        return true
    }

    // 选中菜单
    onMenuClick = (e: any) => {
        this.props.history.push(e.key)
    }

    // defaultOpenkeys只能初始化一次，openKeys: 返回当前所有打开的keys
    onOpenChange = (openKeys: string[]): void => {
        this.setState({ openKeys })
    }

    // 递归取出菜单路径及面包屑名称
    getPathInfo(item: any, curPath: string) {
        if (curPath.indexOf(item.path) === 0 && item.children) {
            this.stack.openKeys.push(item.path)
            this.stack.breadNames.push(item.title)

            item.children.some((child: any) => this.getPathInfo(child, curPath))
        }

        // 去掉菜单形参(如/:id?)和实参(如/20)，再进行比较
        if (item.path.replace(/\/:\w+\??$/, '') === curPath.replace(/\/\d+$/, '')) {
            this.stack.breadNames.push(item.title)
            this.stack.flag = true
            return true
        }

        return false
    }

    // 递归渲染子菜单
    getChildMenu(item: any) {
        if (item.children && item.children.length) {
            return (
                <Menu.SubMenu key={item.path} title={<span><Icon type="folder" />{item.title}</span>}>
                    {
                        item.children.map((child: any) => this.getChildMenu(child))
                    }
                </Menu.SubMenu>
            )
        }
        return (!item.hide && <Menu.Item key={item.path.replace(/\/:\w+\??$/, '')}>{item.title}</Menu.Item>)
    }

    // 根据当前路径初始化sidebar菜单数据
    initMenuData(path?: string) {
        const curPath = path || this.props.location.pathname

        // 根据当前路由获取一级菜单
        const regResult = /(\/\w+)\//.exec(curPath)
        const topPath = regResult ? regResult[1] : ''

        // 根据当前一级菜单过滤出子级
        let sideMenu: Array<Object> = []
        this.store.menu.some((item: any) => {
            if (item.path === topPath) {
                this.stack.breadNames.push(item.title)
                sideMenu = item.children
                return true
            }
        })

        sideMenu.some((item) => {
            if (this.stack.flag) {
                return true
            }
            return this.getPathInfo(item, curPath)
        })

        this.setState({
            sideMenu,
            openKeys: this.stack.openKeys,
            selectedKeys: [curPath]
        })

        // 保存面包屑名称
        this.store.saveBreadNames(this.stack.breadNames)
    }

    render() {
        return (
            <Menu openKeys={this.state.openKeys} selectedKeys={this.state.selectedKeys} mode="inline" onClick={this.onMenuClick} onOpenChange={this.onOpenChange}>
                {
                    this.state.sideMenu.map((item: any) => this.getChildMenu(item))
                }
            </Menu>
        )
    }
}

export default withRouter(SideMenu)
