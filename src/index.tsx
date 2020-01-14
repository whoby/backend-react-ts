import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
// import * as Raven from 'raven-js'

import '@/assets/style/theme.less'
import '@/assets/style/style.scss'

import store from '@/store'
import Router from '@/router'

// 线上启动日志监控系统
// if (Raven && /common\./.test(window.location.hostname)) {
//     Raven.config('https://cd64a13a67c74a4790e45b132aff8245@sentry.domain.com/30').install()
// }

ReactDOM.render(
    <Provider {...store}>
        <Router />
    </Provider>,
    document.getElementById('app') as HTMLElement
)
