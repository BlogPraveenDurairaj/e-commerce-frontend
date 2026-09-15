import React from 'react'

const Breadcrumb = () => {
    const dummy = ['Products', "men's cloth", "product name"]
    return (
        <div>
            <button>Back</button>
            {dummy?.map((item, index) => {
                let isLast = index == dummy.length - 1
                return (
                    <div className={isLast && "isActive"}>{item}{!isLast && ' / '}</div>
                )
            })}
        </div>
    )
}

export default Breadcrumb