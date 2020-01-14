import React from 'react'
import styled from 'styled-components'

export default () => (
    <Root>
        <div className="index"></div>
    </Root>
)

const Root = styled.div`
    .index {
        width: 1100px;
        margin: 100px auto 30px auto;
        height: 510px;
        background: url(${require('@/assets/img/index.jpg')}) no-repeat top center;
    }
`
