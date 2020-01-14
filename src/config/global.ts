/*
 * global props config
 */

// 全局分页配置
const pageProps = {
    current: 1,
    pageSize: 20,
    total: 0,
    showQuickJumper: true,
    showTotal(total: number) {
        return `共 ${total} 条`
    },
}

// 搜索栏input与label占比配置
const formItemLayout = {
    sx: {
        labelCol: { span: 14 },
        wrapperCol: { span: 10 }
    },
    sm: {
        labelCol: { span: 12 },
        wrapperCol: { span: 12 }
    },
    md: {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 }
    },
    lg: {
        labelCol: { span: 7 },
        wrapperCol: { span: 17 }
    },
    sg: {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
    },
}

export { pageProps, formItemLayout }
