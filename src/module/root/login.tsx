import React, { Component, FormEvent } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Form, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import styled from 'styled-components'
import { formItemLayout } from 'config/global'
// import { ajax, util } from 'libs'

const FormItem = Form.Item

interface IProps extends RouteComponentProps<any>, FormComponentProps {
    userStore: any
}

@inject('userStore')
@observer
class Login extends Component<IProps, any> {
    private store: any

    constructor(props: IProps) {
        super(props)
        this.store = this.props.userStore
    }

    private onSubmit = (e: FormEvent<HTMLElement>): void => {
        e.preventDefault()

        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                // 保存登录信息
                this.store.saveUserName(values.userName)
                this.props.history.push('/index')
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Root>
                <div className="loginPage">
                    <div className="loginBox">
                        <div className="logo">通用后台管理系统</div>
                        <Form onSubmit={this.onSubmit} className="mr20">
                            <FormItem {...formItemLayout.sg} label="用户名">
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: '请输入用户名' }]
                                })(<Input placeholder="请输入用户名" />)}
                            </FormItem>
                            <FormItem {...formItemLayout.sg} label="密 码">
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码' }]
                                })(<Input type="password" placeholder="请输入密码" />)}
                            </FormItem>
                            <FormItem style={{ textAlign: 'center' }}>
                                <Button type="primary" htmlType="submit" className="loginBtn">
                                    登录
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </Root>
        )
    }
}

export default withRouter(Form.create()(Login))

const Root = styled.div`
    .loginPage {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        width: 100%;
        top: 0;
        bottom: 0;
        left: 0;
    }
    .loginBox {
        width: 360px;
        color: #c5dfe6;
    }
    .logo {
        margin: 0px auto 40px auto;
        padding-top: 115px;
        color: #fff;
        text-align: center;
        font-size: 23px;
        background: url(${require('assets/img/login-logo.png')}) no-repeat top center;
    }
    ,
    loginbtn: {
        padding: 5px 35px;
        margin-left: 40px;
    }
`
