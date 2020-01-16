import React, { PureComponent } from 'react'
import { Modal } from 'antd'
import styled from 'styled-components'

interface IProps {
    list?: Array<any>
    index: number
    visible: boolean
}

interface IState {
    list: Array<any>
    index: number
    width: number
    visible: boolean
}

class PicView extends PureComponent<IProps, IState> {
    readonly state: Readonly<IState>

    constructor(props: IProps) {
        super(props)
        this.state = {
            list: [],
            index: 0,
            width: 0,
            visible: this.props.visible
        }
    }

    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        if (nextProps.visible !== prevState.visible) {
            return {
                list: nextProps.list || [],
                index: nextProps.index,
                visible: nextProps.visible
            }
        }
        return null
    }

    handleCancel = (): void => {
        this.setState({
            visible: false
        })
    }

    // 根据图片重设弹窗的大小
    setModalWidth = (src: string): void => {
        const img = new Image()
        img.src = src

        img.onload = (e: any): void => {
            const w = e.target.width + 100
            const screen = document.body.clientWidth * 0.8
            this.setState({
                width: w > screen ? screen : w
            })
        }
    }

    // 切换图片
    onSwitchPic(diff: number) {
        const len = this.state.list.length
        const index = this.state.index

        if ((diff === -1 && index === 0) || (diff === 1 && index === len - 1)) {
            return
        }

        this.setState({
            index: this.state.index + diff
        })
    }

    render() {
        const src = this.state.list.length ? this.state.list[this.state.index].url : ''
        this.setModalWidth(src)

        return (
            <Modal title="查看图片" visible={this.state.visible} footer={null} width={this.state.width} onCancel={this.handleCancel}>
                <Root>
                    <table className="wrap">
                        <tbody>
                            <tr>
                                <td>
                                    <span
                                        className={`btn prev ${this.state.index === 0 ? 'disabled' : ''}`}
                                        onClick={this.onSwitchPic.bind(this, -1)}
                                    >
                                        &lt;
                                    </span>
                                </td>
                                <td className="pic-wrap">
                                    <img src={src} alt="" />
                                </td>
                                <td>
                                    <span
                                        className={`btn next ${this.state.index === this.state.list.length - 1 ? ' disabled' : ''}`}
                                        onClick={this.onSwitchPic.bind(this, 1)}
                                    >
                                        &gt;
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Root>
            </Modal>
        )
    }
}

export default PicView

const Root = styled.div`
    .wrap {
        text-align: center;
        vertical-align: center;
        .btn {
            display: inline-block;
            font-size: 40px;
            font-weight: bold;
            font-family: serif;
            color: #999;
            cursor: pointer;
        }
        .disabled {
            color: #efefef;
            cursor: default;
        }
        img {
            max-width: 100%;
        }
        .pic-wrap {
            padding: 0 25px;
        }
    }
`
