import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './goals.css'
import { useContext } from 'react'
import { AppContext } from '../../App'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Goals = () => {
    const {route,setLoader,login,setLogin,token,setToken} = useContext(AppContext);
    const [goals, setGoals] = useState([])
    const [pages, setPages] = useState(1)
    const [arr, setArr] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`${route}/api/goals/show/mine`,{
            headers:{
                "Authorization":`Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.error === "Token exoired" || data.msg === "Unauthorized action."){
                setLogin(false)
                sessionStorage.clear()
                history("/")
              }
              if(data.data){
            setGoals(data.data.data)
            }
        })
    },[])
    useEffect(() => {
        if(login){
            window.onpopstate = () => {
              navigate("/goals")
            };
          }
        }, [login, navigate]);


  return (
   <div className="goals">
    <div className="goals-header">
        <Link to={"/add-goal"}>اٍضافة هدف</Link>
        <h2>الأهداف الاٍستراتيجية</h2>
    </div>
    <div className="main-goals">
        <div className="goals-side">
{arr.map((item,index) => {
    return(
        item <= pages ?
        <div className="num" key={index}>
            0{pages}
        </div> : null
    )
})}
        </div>
        {pages === 1 && goals.length === 0 ?
          <div className="in-goals">
 <div className="goal-card">
            <div className="row">
                <div className="points">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="sub-title">خيرية</div>
            </div>
            <h2>goal status</h2>
</div>
 <div className="goal-card">
            <div className="row">
                <div className="points">
                <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="sub-title">خيرية</div>
            </div>
            <h2>goal status</h2>
</div>
 <div className="goal-card">
            <div className="row">
                <div className="points">
                <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="sub-title">خيرية</div>
            </div>
            <h2>goal status</h2>
</div>
 <div className="goal-card">
            <div className="row">
                <div className="points">
                <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="sub-title">خيرية</div>
            </div>
            <h2>goal status</h2>
</div>
 <div className="goal-card">
            <div className="row">
                <div className="points">
                <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="sub-title">خيرية</div>
            </div>
            <h2>goal status</h2>
</div>
 <div className="goal-card">
            <div className="row">
                <div className="points">
                <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="sub-title">خيرية</div>
            </div>
            <h2>goal status</h2>
</div>
          </div>

 :<div className="in-goals">
 {goals.map((item, index) => (
   <div className="goal-card" key={index}>
     <div className="row">
       <div className="points">
         <div></div>
         <div></div>
         <div></div>
       <div className="links-list">
        <Link to={`/initiative/${item.id}`}> المبادرات</Link>
        <Link to={`/add-goal/${item.id}`}>اضافة مبادرة</Link>
        <Link to={`/report/${item.id}`}>التقرير</Link>
       </div>
       </div>
       <div className="sub-title">{item.status}</div>
     </div>
     <h3>{item.title}</h3>
   </div>
 ))}
</div>}
      

    </div>
   </div>
  )
}

export default Goals