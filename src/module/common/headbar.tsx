import React, { Component, MouseEvent } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter, Link, RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
// import { ajax } from 'libs'

@inject('userStore', 'menuStore')
@observer
class Headbar extends Component<RouteComponentProps & any, any> {
    // 退出
    onLoginOut = (event: MouseEvent<HTMLElement>): void => {
        event.preventDefault()

        this.props.userStore.saveUserName('')
        this.props.history.push('/login')
    }

    // 判断当前地址是否属于一级菜单
    getActiveClassName(linkPath: string) {
        const regResult = /(\/\w+)(\/|$)/.exec(linkPath)
        const topPath = regResult ? regResult[1] : ''

        return this.props.location.pathname.indexOf(topPath) === 0 ? 'is-active' : ''
    }

    render() {
        return (
            <Root>
                <header className="header clear">
                    <h1 className="logo">通用后台管理系统</h1>
                    <nav className="nav">
                        {this.props.menuStore.menu.map((item: any, i: number) => {
                            let { path } = item
                            // 默认取子级第一个
                            if (item.children && item.children.length) {
                                const child = item.children[0]
                                // 若子级不是叶子节点，取孙子级
                                if (child.children && child.children.length) {
                                    path = child.children[0].path
                                } else {
                                    path = item.children[0].path
                                }
                            }
                            return (
                                <Link to={path} key={i} className={`${this.getActiveClassName(path)} link`}>
                                    {item.title}
                                </Link>
                            )
                        })}
                    </nav>
                    <div className="info">
                        欢迎您<strong style={{ padding: '0 10px' }}>{this.props.userStore.userName}</strong>|
                        <a className="pl15" onClick={this.onLoginOut}>
                            退出
                        </a>
                    </div>
                </header>
            </Root>
        )
    }
}

export default withRouter(Headbar)

const Root = styled.header`
    .header {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        height: 60px;
        color: #fff;
        z-index: 999;
    }
    .logo {
        float: left;
        margin: 15px 0 10px 25px;
        font-size: 22px;
        letter-spacing: 1.5px;
        font-weight: normal;
    }
    .nav {
        float: left;
        margin: 22px 0 0 80px;
    }
    .link {
        display: inline-block;
        margin: 0 15px;
    }
    .info {
        float: right;
        margin: 20px 20px 0 0;
    }
`
