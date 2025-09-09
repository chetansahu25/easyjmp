import React from 'react'
import TopNav from '../TopNav'
import Aside from '../Aside'
import { Outlet } from 'react-router'

const UserLayout = () => {
  return (
    <div>
        <TopNav />
        <Aside /> 
        <Outlet />
    </div>
  )
}

export default UserLayout