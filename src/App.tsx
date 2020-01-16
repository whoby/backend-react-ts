import * as React from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import styled from 'styled-components'
import Headbar from '@/module/common/headbar'
import Sidebar from '@/module/common/sidebar'
import Breadcrumb from '@/module/common/breadcrumb'

const App = (route: any) => (
    <ConfigProvider locale={zhCN}>
        <Root>
            <div className="app">
                <Headbar />
                <div className="content">
                    {route.location.pathname === '/index' ? (
                        route.children
                    ) : (
                        <div>
                            <aside className="aside">
                                <Sidebar />
                            </aside>
                            <div className="main">
                                <div className="breadcrumb">
                                    <Breadcrumb />
                                </div>
                                <div className="mainContent">{route.children}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Root>
    </ConfigProvider>
)
export default App

const Root = styled.div`
    .app {
        background-color: #fff;
    }
    .content {
        margin-top: 60px;
        padding: 0;
        width: 100%;
    }
    .aside {
        position: fixed;
        display: block;
        top: 60px;
        bottom: 0;
        left: 0;
        width: 12%;
        overflow-x: hidden;
        color: #333;
        z-index: 999;
        border-right: 1px solid #ddd;
    }
    .main {
        padding: 20px;
        background-color: #fff;
        width: 88%;
        margin-left: 12%;
    }
    .breadcrumb {
        padding: 8px 15px;
        list-style: none;
        background-color: #f5f5f5;
        border-radius: 4px;
        font-size: 14px;
    }
    .mainContent {
        margin-top: 20px;
        padding: 0 20px 20px;
    }
`
