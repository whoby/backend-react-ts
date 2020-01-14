import React, { Component } from 'react'

export default function asyncComponent(importComponent: any): any {
    class AsyncComponent extends Component<any, any> {
        constructor(props: any) {
            super(props)
            this.state = {
                component: null
            }
        }

        async componentDidMount() {
            const { default: component } = await importComponent()

            this.setState({ component })
        }

        render() {
            const C: any = this.state.component

            return C ? <C {...this.props} /> : null
        }
    }

    return AsyncComponent
}
