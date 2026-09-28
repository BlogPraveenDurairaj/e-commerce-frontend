import React from 'react'

const AdminLayout = ({ children, title }) => {
  return (
    <div>
      <div className='p-5'>
        {title && <h1 className='text-2xl font-bold text-gray-800 mb-4'>{title}</h1>}
        {children}</div>
    </div>
  )
}

export default AdminLayout