import React, { useState } from 'react'
import AdminSideMenu from '../UI/AdminSideMenu'
import { DashboardIcon, ProductIcon, OrderIcon, BackArrow } from '../../assets/svgComponent/SvgIcon2'
import AdminHeader from '../UI/AdminHeader'
import { Link } from 'react-router-dom'
import cx from 'classnames';

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
  const [expand, setExpand] = useState(true)


  return (
    <div>
      <AdminSideMenu data={adminSideMenuData} expand={expand} setExpand={setExpand} />
      <main className={cx('transition-all duration-300 ease-in-out', expand ? 'ms-64' : 'ms-[84px]')}>
        <AdminHeader />
        <div className='p-5 bg-[#fcfcfd]'>
          {(backNavigation || title) &&
            <div className='flex items-center gap-3 mb-4'>
              {backNavigation && <Link aria-label='back' className='bg-white rounded-md p-1 border border-gray-200' to={backNavigation}><BackArrow /></Link>}
              {title && <h1 className='text-2xl font-bold text-gray-800'>{title}</h1>}
            </div>}
          {children}
        </div>
      </main>
    </div>
  )
}

export default AdminLayout