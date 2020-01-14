import * as React from 'react'
import { Select } from 'antd'

const { Option } = Select

interface Props {
    keyName?: string
    valueName?: string
    disabled?: boolean
    className?: string
    style?: any
    mode?: string
    allowClear?: boolean
    onChange?(): void
}

const renderSelect = (data: any, selectArgs?: Props) => {
    const args = Object.assign({
        keyName: 'id',
        valueName: 'name',
        disabled: false,
        className: '',
        style: {},
        mode: '',
        allowClear: true,
        onChange() { }
    }, selectArgs)

    let options: any = null
    // 兼容数组or对象
    if (Object.prototype.toString.call(data) === '[object Array]') {
        options = data.map((item: any) => <Option key={item[args.keyName]} value={item[args.keyName]}>{item[args.valueName]}</Option>)
    } else {
        options = Object.keys(data).map(key => <Option key={key} value={key}>{data[key]}</Option>)
    }
    // mode=multiple 多选
    return (
        <Select placeholder="请选择" mode={args.mode} allowClear={args.allowClear} disabled={args.disabled} className={args.className} style={args.style} onChange={args.onChange}>
            {options}
        </Select>
    )
}

export default renderSelect
