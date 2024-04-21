import React from 'react'
import goals from '../../assets/goals.png'
import mobadra from '../../assets/mobadra.png'
import reports from '../../assets/rep.png'
import talabat from '../../assets/talabat.png'
import { Link } from 'react-router-dom'
import './side.css'

const Side = () => {
  const prevent = (e) => {
    e.preventDefault()
  }
  return (
   <div className="side">
    <div className="goals">
        <Link to={"/goals"} >الأهداف الاستراتيجية <img src={goals} alt="" /> </Link>
        <Link to={"/mobadra"} onClick={prevent}>المبادرات <img src={mobadra} alt="" /></Link>
        <Link to={"/reports"} onClick={prevent}>التقارير <img src={reports} alt="" /></Link>
        <Link to={"talabat"} onClick={prevent}>طلبات المنح <img src={talabat} alt="" /></Link>
    </div>
    <div className="side-shape">
        <div className="inside-1"></div>
        <div className="inside-2"></div>
    </div>
   </div>
  )
}

export default Side