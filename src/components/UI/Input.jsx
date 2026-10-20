import React from 'react';
import cx from 'classnames';

const Input = ({ label, id,className,error,disabled, ...props }) => {
    return (
        <div className='flex flex-col gap-2 justify-start'>
            {label && <label htmlFor={id} className="text-sm font-semibold text-gray-800 text-start">{label}</label>}
            <input id={id} className={cx('p-2.5 px-3 border border-gray-300 rounded-lg focus:border-emerald-600 focus:outline-none text-sm bg-white', className, error && "border-red-500",disabled && 'opacity-70 cursor-not-allowed')
            } {...props} />
            {error && <span  className="text-xs text-red-500 text-start">{error}</span>}
        </div>
    )
}

export default Input