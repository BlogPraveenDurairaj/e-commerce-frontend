import React from 'react'
import AdminSideMenu from '../UI/AdminSideMenu'
import { DashboardIcon, ProductIcon, OrderIcon, BackArrow } from '../../assets/svgComponent/SvgIcon2'
import AdminHeader from '../UI/AdminHeader'
import { Link } from 'react-router-dom'

const AdminLayout = ({ children, title, backNavigation }) => {
  const adminSideMenuData = [
    {
      label: 'Dashboard',
      description: 'Overview & Stats',
      link: '/dashboard',
      Icon: DashboardIcon
    },
    {
      label: 'Manage Products',
      description: 'Overview & Stats',
      link: '/manage-products',
      Icon: ProductIcon
    },
    {
      label: 'Manage orders',
      description: 'Overview & Stats',
      link: '/manage-orders',
      Icon: OrderIcon
    }
  ]

  return (
    <div>
      <AdminSideMenu data={adminSideMenuData} />
      <main className='ms-64'>
        <AdminHeader />
        <div className='p-5 bg-gray-50'>
          <div className='flex items-center gap-3 mb-4'>
            {backNavigation && <Link aria-label='back' className='bg-white rounded-md p-1 border border-gray-200' to={backNavigation}><BackArrow/></Link>}{title && <h1 className='text-2xl font-bold text-gray-800'>{title}</h1>}</div>
          {children}
        </div>
      </main>
    </div>
  )
}

export default AdminLayout