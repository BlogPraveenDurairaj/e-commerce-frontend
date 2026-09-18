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
        primary: 'flex items-center gap-1.5 justify-center font-medium bg-theme-primary px-5 py-2.5 text-white rounded-xl text-sm cursor-pointer no-underline border-2 border-transparent hover:opacity-90 transition-opacity',
        secondary: 'text-[var(--theme-primary)] cursor-pointer bg-white [background:linear-gradient(white,white)_padding-box,var(--theme-primary)_border-box] border-2 border-transparent rounded-xl justify-center items-center gap-1.5 px-5 py-2 text-sm font-medium no-underline flex'
    }

    if (type == 'link') {
        return <Link to={to} className={cx(elementStyle[style], containerClass)} target={target} >{label}</Link>
    }

    return (

        <button type={actionType} className={cx(elementStyle[style], containerClass)} onClick={buttonAction}>{Icon && <Icon size={IconSize} />}<span>{label}</span></button>
    )
}

export default Button