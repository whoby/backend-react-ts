import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Breadcrumb } from 'antd'

@inject('menuStore')
@observer
class Bread extends Component<any, object> {
    render(): JSX.Element {
        return (
            <Breadcrumb style={{ margin: '3px 0' }}>
                {this.props.menuStore.breadNames.map((item: string, index: number) => (
                    <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                ))}
            </Breadcrumb>
        )
    }
}

export default withRouter(Bread)
