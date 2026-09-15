import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

const Button = (props) => {
    const { 
        label,
        Icon, 
        containerClass, 
        buttonAction, 
        IconSize, 
        type = 'button', 
        to, 
        style = "primary",
        target,
        actionType='button'
    } = props

    const elementStyle = {
        primary: 'primary_button',
        secondary: 'secondary_button'
    }

    if (type == 'link') {
        return <Link to={to} className={cx(elementStyle[style], containerClass)} target={target} >{label}</Link>
    }

    return (

        <button type={actionType} className={cx(elementStyle[style], containerClass)} onClick={buttonAction}>{Icon && <Icon size={IconSize} />}<span>{label}</span></button>
    )
}

export default Button