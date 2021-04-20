import React from 'react';
import classnames from 'classnames'
import Logo from '@/assets/images/i-logo.png'
import styles from './index.less'
import { hot } from 'react-hot-loader/root';
function App () {
    return (
        <section className={classnames(styles['m-head'], 'f-tc u-app')}>
            <h1 className="g-fs34">Webpack React</h1>
            <p className={styles['a-fadein']}><img className="u-w200" src={Logo} alt={''}/></p>
            <p>Start a new project</p>
        </section>
    )
}
export default hot(App)