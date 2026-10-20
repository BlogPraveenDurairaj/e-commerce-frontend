import React from 'react'

const AdminHeader = () => {
    return (
        <header className='p-4 bg-white border-b border-gray-200 sticky top-0 z-10  h-16'>
            <div className='flex justify-end'>
                <div className='flex gap-2 items-center'>
                    <span className='bg-gray-50 p-1 px-2 rounded-sm border border-gray-200 font-bold'>P</span>
                    <span className='text-sm'>Praveen</span>
                </div>
            </div>
        </header>
    )
}

export default AdminHeader