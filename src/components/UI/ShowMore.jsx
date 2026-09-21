import React, { useState } from 'react'
import Button from './Button'

const ShowMore = ({ data, limit, Component, containerClass }) => {
    const [show, SetShow] = useState(false)
    return (
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
            <div className='flex justify-center'><Button style={'black'} label={show ? "Show less" : "show more"} buttonAction={() => SetShow((pre) => !pre)} /></div>
        </div>
    )
}

export default ShowMore