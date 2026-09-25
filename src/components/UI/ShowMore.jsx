import React, { useState } from 'react'
import Button from './Button'

const ShowMore = ({ data, limit, Component, containerClass }) => {
    const [show, SetShow] = useState(false)
    const handleShow = (e) => {
        e.stopPropagation();
        e.preventDefault()
        SetShow((pre) => !pre)
    }
    return (
        <div >
            <div className={containerClass}>
                {data.slice(0, limit).map((item, index) => {
                    return (
                        <Component product={item} key={index} />
                    )
                })}
                {show && data.slice(limit, data.length).map((item, index) => {
                    return (
                        <Component product={item} key={index} />
                    )
                })}
            </div>
            <div className='flex justify-center mt-2.5'><Button style={'black'} label={show ? "Show less" : "show more"} buttonAction={handleShow} /></div>
        </div>
    )
}

export default ShowMore