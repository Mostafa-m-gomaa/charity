import React, { useEffect } from 'react'
import { useContext } from 'react';
import { AppContext } from '../../App';
import { Link } from 'react-router-dom';
import './user-header.css'
const UserHeader = () => {
    const {route,setLoader,login,setLogin,token,setToken} = useContext(AppContext);

    useEffect(() => {
fetch(`${route}/api/org/${sessionStorage.getItem("id")}`,{
    headers:{
      "Authorization":`Bearer ${sessionStorage.getItem("token")}`
    }
})
.then(res => res.json())
.then(data => {
    console.log(data)
})
    },[])
  return (
 <div className="user-header">
    <div className="container">
        <Link to="/">تسجيل الخروج </Link>
        <img src={`${route}/storage/${sessionStorage.getItem("logo")}`} alt="" />
    </div>
 </div>
  )
}

export default UserHeader