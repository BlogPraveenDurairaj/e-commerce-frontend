import React, { useState } from 'react'

const PreviewImage = ({ imageData }) => {
    const [activeImage,setActiveImage] = useState(imageData[0].url)
    return (
        <div>
            <div className='bg-gray-50 h-[400px] mb-3 rounded-2xl flex justify-center'>
                <img src={activeImage}  className='h-full'/>
            </div>
            <div className='flex gap-2'>
                {imageData?.map((item) => {
                    return (
                        <button key={item.url} className='w-20 h-20 rounded-xl border-gray-100 border cursor-pointer hover:shadow-md' onClick={()=>setActiveImage(item?.url)}>
                            <img src={item.url} alt={item?.altText} className='w-full h-full object-cover rounded-xl' />
                        </button>
                    )
                })}
            </div>

        </div>
    )
}

export default PreviewImage