// https://eslint.org/docs/user-guide/configuring
module.exports = {
    root: true, // eslint找到这个标识后，停止向上找eslint的配置文件
    parser: 'typescript-eslint-parser',
    plugins: ['typescript'],
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true // 启用JSX
        }
    },
    env: {
        browser: true,
        node: true
    },
    globals: {
        window: true
    },
    // 使用第三方airbnb开发配置合集
    extends: 'airbnb',
    rules: {
        indent: ['warn', 4],
        quotes: [2, 'single'], //单引号
        'no-console': 0, //不禁用console
        'no-var': 0, //对var警告
        semi: ['error', 'never'], //强制使用分号,1:warn 2:error
        'global-require': 0, // 允许使用require
        'max-len': 0, //强制一行的最大长度
        'no-irregular-whitespace': 0, //不规则的空白不允许
        'no-trailing-spaces': 1, //一行结束后面有空格就发出警告
        'eol-last': 0, //文件以单一的换行符结束
        'no-unused-vars': [0, { vars: 'all', args: 'after-used' }], //不能有声明后未被使用的变量或参数
        'no-underscore-dangle': 0, //标识符不能以_开头或结尾
        'no-alert': 2, //禁止使用alert confirm prompt
        'no-lone-blocks': 0, //禁止不必要的嵌套块
        'no-bitwise': 0, //禁止使用按位运算符
        'no-class-assign': 2, //禁止给类赋值
        'no-cond-assign': 2, //禁止在条件表达式中使用赋值语句
        'no-const-assign': 2, //禁止修改const声明的变量
        'no-delete-var': 2, //不能对var声明的变量使用delete操作符
        'no-dupe-keys': 2, //在创建对象字面量时不允许键重复
        'no-duplicate-case': 2, //switch中的case标签不能重复
        'no-dupe-args': 2, //函数参数不能重复
        'no-empty': 2, //块语句中的内容不能为空
        'no-func-assign': 2, //禁止重复的函数声明
        'no-invalid-this': 0, //禁止无效的this，只能用在构造器，类，对象字面量
        'no-mixed-operators': 0, // 允许混合使用不同的操作符
        'no-redeclare': 2, //禁止重复声明变量
        'no-return-assign': 0, //禁止在 return 语句中使用赋值语句
        'no-spaced-func': 0, //函数调用时 函数名与()之间不能有空格
        'no-this-before-super': 0, //在调用super()之前不能使用this或super
        'no-undef': 0, //不能有未定义的变量,此处ts自动会判断，所以关闭
        'no-use-before-define': 0, //未定义前不能使用，组件内css in js用，所以关掉
        'no-param-reassign': 0, //不允许对 function 的参数进行重新赋值
        camelcase: 0, //强制驼峰法命名
        'func-names': 0, //强制使用命名的 function 表达式
        'function-paren-newline': 0, //函数()不能换行
        'import/no-unresolved': 0, //webpack别名引用
        'import/extensions': 0, //关闭import省略后缀报错
        'import/prefer-default-export': 0, //推荐默认导出export default
        'import/no-extraneous-dependencies': 0, //不允许使用未在package.json里明确列出的依赖
        'jsx-quotes': [2, 'prefer-double'], //强制在JSX属性（jsx-quotes）中一致使用双引号,
        'jsx-a11y/click-events-have-key-events': 0, //点击事件要有相应的key
        'jsx-a11y/label-has-for': 0, // label可以不加for
        'jsx-a11y/no-noninteractive-element-interactions': 0, //非交互标签有交互
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/anchor-is-valid': 0, //连接只能a标签
        'react/display-name': 0, //防止在React组件定义中丢失displayName
        'react/forbid-prop-types': [2, { forbid: ['any'] }], //禁止某些propTypes
        'react/jsx-boolean-value': 2, //在JSX中强制布尔属性符号
        'react/jsx-closing-bracket-location': 1, //在JSX中验证右括号位置
        'react/jsx-curly-spacing': [2, { when: 'never', children: true }], //在JSX属性和表达式中加强或禁止大括号内的空格。
        'react/jsx-indent': [1, 4], //验证JSX中的缩进
        'react/jsx-indent-props': [1, 4], //验证JSX中的props缩进
        'react/jsx-key': 2, //在数组或迭代器中验证JSX具有key属性
        'react/jsx-max-props-per-line': [1, { maximum: 8 }], // 限制JSX中单行上的props的最大数量
        'react/jsx-no-bind': 0, //JSX中不允许使用箭头函数和bind
        'react/jsx-no-duplicate-props': 2, //防止在JSX中重复的props
        'react/jsx-no-literals': 0, //防止使用未包装的JSX字符串
        'react/jsx-no-undef': 1, //在JSX中禁止未声明的变量
        'react/jsx-pascal-case': 0, //为用户定义的JSX组件强制使用PascalCase
        'react/jsx-uses-react': 1, //防止反应被错误地标记为未使用
        'react/jsx-uses-vars': 2, //防止在JSX中使用的变量被错误地标记为未使用
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'react/jsx-first-prop-new-line': 0, //jsx第一个属性新换行
        'react/no-danger': 0, //防止使用危险的JSX属性
        'react/no-did-mount-set-state': 0, //防止在componentDidMount中使用setState
        'react/no-did-update-set-state': 1, //防止在componentDidUpdate中使用setState
        'react/no-direct-mutation-state': 2, //防止this.state的直接变异
        'react/no-multi-comp': 2, //防止每个文件有多个组件定义
        'react/no-set-state': 0, //防止使用setState
        'react/no-unknown-property': 2, //防止使用未知的DOM属性
        'react/prefer-es6-class': 2, //为React组件强制执行ES5或ES6类
        'react/prop-types': 0, //防止在React组件定义中丢失props验证
        'react/react-in-jsx-scope': 2, //使用JSX时防止丢失React
        'react/self-closing-comp': 0, //防止没有children的组件的额外结束标签
        'react/sort-comp': 0, //强制组件方法顺序
        'no-extra-boolean-cast': 0, //禁止不必要的bool转换
        'react/no-array-index-key': 0, //防止在数组中遍历中使用数组key做索引
        'react/no-deprecated': 1, //不使用弃用的方法
        'react/jsx-equals-spacing': 2, //在JSX属性中强制或禁止等号周围的空格
        'space-before-function-paren': ['error', 'never'], // function与()之间的空格
        'template-tag-spacing': 0, // 字符串模板前空格
        'no-unreachable': 1, //不能有无法执行的代码
        'comma-dangle': ['error', 'only-multiline'], //对象字面量项尾不能有逗号
        'consistent-return': 0, //要求return语句总是指定返回的值
        'no-mixed-spaces-and-tabs': 0, //禁止混用tab和空格
        'prefer-arrow-callback': 0, //比较喜欢箭头回调
        'prefer-destructuring': 0, //属性解构
        'array-callback-return': 0, //强制数组方法的回调函数中有return语句
        'arrow-parens': 0, //箭头函数用小括号括起来
        'arrow-spacing': 0, //=>的前/后括号
        'arrow-body-style': 0, //箭头函数无用的return去掉
        'function-paren-newline': 0,
        'typescript/class-name-casing': 'error', //类及接口驼峰提示
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off' // 开发下允许debugger
    }
}
