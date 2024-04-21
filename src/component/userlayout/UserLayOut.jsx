import React from 'react'
import UserHeader from '../user-header/UserHeader'
import { Outlet } from 'react-router-dom'
import './layout.css'
import Side from '../side/Side'

const UserLayOut = () => {
  return (
    <div className="user-lay">
          <div className="shape"></div>
       <UserHeader/>
       <div className="content">
       <Outlet/>
    <Side />
       </div>
    </div>
  )
}

export default UserLayOut