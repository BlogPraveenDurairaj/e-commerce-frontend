import React from 'react';
import cx from 'classnames';

const Select = ({ label, id, className, error, disabled, options, ...props }) => {
    return (
        <div className='flex flex-col gap-2 justify-start'>
            {label && <label htmlFor={id} className="text-sm font-medium text-gray-700 text-start">{label}</label>}
            <select id={id} className={cx('p-2.5 px-3 border border-gray-300 rounded-lg outline-emerald-600 text-sm select-custom-arrow bg-white cursor-pointer', className, error && "border-red-500", disabled && 'opacity-70 cursor-not-allowed')
            } {...props} >
                {Array.isArray(options) ? options.map((item) => <option key={item} value={item}>{item}</option>) : <>{options}</>}
            </select>
            {error && <span className="text-xs text-red-500 text-start">{error}</span>}
        </div>
    )
}

export default Select