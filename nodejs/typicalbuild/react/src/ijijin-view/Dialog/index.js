import React, {useEffect} from 'react';
import classNames from 'classnames'
import './index.less'

function preventTouch(e) {
    e.stopPropagation();
}

export default function Dialog(props) {
    const {
        className, children, opacity = 0.8, click = () => {}
    } = props;
    let $Dialog = React.createRef();
    useEffect(() => {
        let $Dom = $Dialog.current;
        $Dom.addEventListener('touchmove', preventTouch);
        return function clearEvent() {
            $Dom.removeEventListener('touchmove', preventTouch)
        }
    });
    return (
        <section onClick={click} ref={$Dialog} style={{backgroundColor: `rgba(0,0,0,${opacity})`}}
                 className={classNames(className, 'm-dialog')}>
            {children}
        </section>
    )
}