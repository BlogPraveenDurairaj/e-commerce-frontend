import React from 'react'
import SearchHeaderAndFilterWrapper from '../../pages/searchPage/SearchHeaderAndFilterWrapper'

const UserLayout = ({children,isNotSearchPage}) => {
  return (
    <div>
        <SearchHeaderAndFilterWrapper isNotSearchPage={isNotSearchPage}/>
        {children}
    </div>
  )
}

export default UserLayout