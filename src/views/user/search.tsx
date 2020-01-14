import React, { FormEvent } from 'react'
import { observer, inject } from 'mobx-react'
import { Form, Row, Col, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { formItemLayout } from '@/config/global'
import renderSelect from '@/components/renderSelect'
import util from '@/libs/util'

const FormItem = Form.Item

interface IProps {
    onSearchChange(searchData: any): void
}

interface IState {
    type: Record<string, any>
}

@inject('userStore')
@observer
class Search extends React.Component<any & IProps & FormComponentProps, IState> {
    readonly state: Readonly<IState>

    constructor(props: any) {
        super(props)
        this.state = {
            type: {
                1: '手机号',
                2: '身份证号'
            }
        }
    }

    componentDidMount() {
        this.onSearch()
    }

    private onSearch = (event?: FormEvent<HTMLElement>): void => {
        // eslint-disable-next-line
        event && event.preventDefault()

        this.props.form.validateFields({ force: true }, (err: any, values: Record<string, any>): void => {
            if (!err) {
                // 去除空值&空格
                this.props.onSearchChange(util.batchTrim(values))
            }
        })
    }

    public render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Form onSubmit={this.onSearch} className="searchForm">
                    <Row>
                        <Col span={3}>
                            <FormItem {...formItemLayout.lg} label="类型">
                                {getFieldDecorator('type', {
                                    initialValue: '1'
                                })(
                                    renderSelect(this.state.type, {
                                        style: { width: 140 }
                                    })
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="关键词">
                                {getFieldDecorator('reqParam')(<Input placeholder="请输入搜索关键词" />)}
                            </FormItem>
                        </Col>
                        <Col span={2}>
                            <FormItem>
                                <Button type="primary" icon="search" htmlType="submit">
                                    查询
                                </Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default Form.create<any>()(Search)
