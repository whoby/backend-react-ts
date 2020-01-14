import * as React from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'
import ajax from 'libs/ajax'
import { Table } from 'antd'

interface IProps {
    searchData: Object
}

interface IState {
    gridData: any[]
}

@inject('userStore')
@observer
class GridList extends React.Component<IProps, IState> {
    readonly state = {
        gridData: []
    } as IState

    private mounted: boolean = false

    componentDidMount() {
        this.mounted = true
    }

    // 响应search组件传参
    componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.searchData !== this.props.searchData) {
            this.initGridData(nextProps.searchData)
        }
    }

    componentWillUnmount() {
        this.mounted = false
    }

    initGridData(searchData: Object) {
        const params = {
            ...(searchData || this.props.searchData)
        }

        ajax.post('/user/list', params, (res: any) => {
            if (this.mounted) {
                this.setState({
                    gridData: res.list || []
                })
            }
        })
    }

    static gridProps = {
        columns: [
            {
                title: '用户ID',
                dataIndex: 'userId'
            },
            {
                title: '用户头像',
                dataIndex: 'headImg',
                render: (v: string) => <img src={v} className="headImg" />
            },
            {
                title: '用户昵称',
                dataIndex: 'nickName'
            },
            {
                title: '手机号',
                dataIndex: 'telephone'
            },
            {
                title: '注册时间',
                dataIndex: 'createTime'
            }
        ],
        rowKey: 'userId'
    }

    render() {
        return (
            <Root>
                <div className="gridList">
                    <Table {...GridList.gridProps} dataSource={this.state.gridData} pagination={false} />
                </div>
            </Root>
        )
    }
}

export default GridList

const Root = styled.div`
    padding: 5px;
    .tabNav {
        border-top: 1px solid #e8e8e8;
        .ant-tabs-bar {
            background-color: #f9f9f9;
        }
    }
    .baseInfo {
        li {
            float: left;
            width: 50%;
            line-height: 50px;
            border-bottom: 1px solid #f2f2f2;
            label {
                display: inline-block;
                width: 95px;
                padding-right: 3px;
                text-align: right;
            }
        }
        .noLine {
            border-bottom: 0;
        }
    }
`
