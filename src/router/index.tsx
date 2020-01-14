import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import App from '@/App'
import Container from 'module/common/container'
import asyncComponent from 'components/asyncComponent'

/* beautify preserve:start */

/* 公共模块 */
const Login = asyncComponent(() => import(/* webpackChunkName: "Login" */ 'module/root/login'))
const Index = asyncComponent(() => import(/* webpackChunkName: "Index" */ 'module/root/index'))
const NotFound = asyncComponent(() => import(/* webpackChunkName: "NotFound" */ 'module/error/notFound'))

/* 基础管理 */
const UserList = asyncComponent(() => import(/* webpackChunkName: "UserList" */ 'module/user/index'))

/* beautify preserve:end */

// 路由配置
const routes = [
    {
        path: '/index',
        title: '首页',
        component: Index
    },
    {
        path: '/user',
        title: '用户',
        component: Container,
        children: [
            {
                path: '/user/list',
                title: '客户列表',
                component: UserList
            }
        ]
    }
]

@inject('menuStore')
@observer
class IndexRouter extends Component<any & RouteComponentProps, any> {
    constructor(props: any) {
        super(props)
        this.props.menuStore.saveMenu(routes)
        this.getAuthToken()
    }

    // 获取生产环境下token
    getAuthToken() {
        const result = window.location.search.match(/sso_token=(\w+)&?/)
        const authToken = result && result[1]
        this.props.menuStore.saveAuthToken(authToken || '')
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact render={() => <Redirect to="/login" />} />
                    <Route path="/login" component={Login} />
                    <App>
                        <Switch>
                            {routes.map((item, i) => (
                                <Route
                                    path={item.path}
                                    key={i}
                                    render={(props: any) => (
                                        <item.component {...props} routes={item.children} path={item.path} />
                                    )}
                                />
                            ))}
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </App>
                </Switch>
            </Router>
        )
    }
}

export default IndexRouter
