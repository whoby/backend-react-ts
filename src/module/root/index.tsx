import React from 'react'

export default () => (
    <div style={styles.index}></div>
)

const styles = {
    index: {
        width: 1100,
        margin: '100px auto 30px auto',
        height: 510,
        background: `url(${require('assets/img/index.jpg')}) no-repeat top center`,
    }
}
