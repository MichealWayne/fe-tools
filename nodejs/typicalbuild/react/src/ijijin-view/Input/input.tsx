/**
 * input
 */

import React, { Component } from 'react'
import classnames from 'classnames'
import Icon from '../IconMin'
import '../less/Input.less'

class Input extends Component<any, any> {

    /**
     * clear value
     */
    clearVal = () => {
        let {
            emitInput
        } = this.props;

        if (emitInput) emitInput('')
    }

    /**
     * onChange
     */
    onChange = (e: any) => {
        let _value = e.target && e.target.value;

        let {
            emitInput
        } = this.props;

        if (emitInput) emitInput(_value)
    }
    
    render () {
        let {
            readOnly,
            clearable,
            className,
            type,
            border,
            value,
            // emitInput,
            focus,
            blur,
        } = this.props;

        let _class = classnames('ru-input', { 'f-bd': border }, className);

        return (<div className={_class}>
            <input
                readOnly={readOnly}
                value={value}
                type={type}
                onChange={this.onChange}
                onFocus={focus}
                onBlur={blur}
            />
            {
                clearable && <Icon type="close-fill"  onClick={this.clearVal}/>
            }
        </div>)
    }
}

export default Input;