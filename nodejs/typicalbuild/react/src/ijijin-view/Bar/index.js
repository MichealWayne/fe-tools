import React from 'react'
import './index.less'

export default function (props) {
    const {value} = props;
    const style = {
        backgroundColor: props.backgroundColor || '#ccc',
        height: props.height || '7px',
        width: props.width || '100px',
        ...props.style
    };
    return (
        <div className={'c-bar'} style={style}>
            {value}
        </div>
    )
}