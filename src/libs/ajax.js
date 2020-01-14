/*
 * 用例： ajax.post(url, params, callback, { enctype: 'form' })
 * enctype: json: 默认值，form: 普通form类型，multi: 二进制文件form类型
 */

import axios from 'axios'
import qs from 'qs'
import { message } from 'antd'

// 跨域允许传cookie
axios.defaults.withCredentials = true
// 表明是异步ajax请求，而非传统的同步请求，在会话过期时后端拦截器跳转时有用
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'

const doAction = (type, url, params, callback, opts) => {
    // 默认选项(enctype: 'multi' 时，可进行二进制form提交)
    opts = Object.assign({ enctype: 'form', diy: false, msg: '数据返回错误！' }, opts)

    params = params || {}
    // 参数处理，get包一层
    if (type === 'get') {
        params = { params }
    } else {
        // 只有form类型需要qs序列化（multipart/form-data除外）
        params = opts.enctype === 'form' ? qs.stringify(params) : params
    }

    // 本地代理时需要（为区别history模式的路由），先加上前缀，再config/index.js代理时去掉
    url = `/api${url}`

    // 请求主体
    return axios[type](url, params)
        .then(response => {
            // 拦截未登录状态
            const res = response.data.ret || response.data
            if (res.code && res.code === '-1999') {
                message.warning(res.msg || '请先登录！')
                window.location.href = `${window.location.origin}/login`
                return false
            }

            // 回调函数里报错会上升到Promise，触发错误catch，所以用try处理
            callback = callback || function() {}
            try {
                // 自定义处理结果
                if (opts.diy) {
                    callback(res)
                } else if (res.success) {
                    callback(res.data)
                } else {
                    message.warning(res.msg || opts.msg)
                }
            } catch (e) {
                message.error(String(e))
            }
            return Promise.resolve(res)
        })
        .catch(error => {
            const msg = `Code：[${error.response.status}]，接口错误，请检查！`
            // 若自定义，组装成统一的结构
            if (opts.diy) {
                callback({
                    success: false,
                    msg
                })
            } else {
                message.error(msg)
            }
            return Promise.reject(error)
        })
}

export default {
    get(...args) {
        return doAction('get', ...args)
    },
    post(...args) {
        return doAction('post', ...args)
    },
    all(reqs) {
        return axios
            .all(reqs)
            .then(axios.spread((...res) => Promise.resolve(res)))
            .catch(error => Promise.reject(error))
    }
}
