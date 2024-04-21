import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../../App'
import { useState ,useEffect } from 'react'
import './init.css'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Initiatives = () => {
    const {route,setLoader,login,setLogin,token,setToken} = useContext(AppContext);
    const [initiatives, setInitiatives] = useState([])
    const param =useParams()
    const [goal,setGoal]=useState({})
    const [showConfirm ,setShowConfirm]=useState(false)
    const [initId,setInitId]=useState(0)
    const [refresh,setRefresh]=useState(false)
    const [keys, setKeys] = useState([
      "title","desc","problem","budget","image","google_sheet_link","strategy_type"
    ])

    const deleteCateg =()=>{
        setLoader(true)
        setShowConfirm(false)
        fetch(`${route}/api/initiative/${initId}`,{
          method :"DELETE" ,
          headers :{
            "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
          }
        })
        .then(res => res.json())
        .then(data => {
          setLoader(false)
          if(data.status === "success"){
    toast.success("تم الحذف بنجاح")
    setRefresh(!refresh)
          }
          else{
            toast.error("لم يتم الحذف")
          }
        })
      }
      const deleteButton =(id)=>{
        setInitId(id)
        setShowConfirm(true)
      }

    useEffect(() => {
        fetch(`${route}/api/initiative/showRelated/${param.id}`,{
          method:"PUT",
            headers:{
                "Authorization":`Bearer ${sessionStorage.getItem("token")}` ,
                "Content-Type":"application/json"
            } ,
            body:JSON.stringify({
              relationNames:[],
              keys:keys
          })
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
            setInitiatives(data.data)
            }
        })
    },[refresh])
    useEffect(() => {
        fetch(`${route}/api/goals/${param.id}`,{
            headers:{
                "Authorization":`Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
          
            if(data.error === "Token exoired" || data.msg === "Unauthorized action."){
                setLogin(false)
                sessionStorage.clear()
                history("/")
              }
                if(data.data){
            setGoal(data.data)
            }
       
        })
    },[refresh])
    
  return (
    <div className="initiatives">
          {showConfirm ?   <div className="confirm">
    <div>هل انت متاكد انك تريد حذف هذا ؟</div>
    <div className="btns">
      <button onClick={deleteCateg} className='yes' >Yes</button>
      <button onClick={() => setShowConfirm(false)} className='no'>No</button>
    </div>
  </div> :null}
       <div className="init-header">
        <Link to={`/add-goal/${param.id}`}>اضافة مبادره</Link>
        <h2>المبادرات</h2>
       </div>
       <div>المشكلة</div>
       <div>{goal.problem}</div>
       <hr />
       <div>شرح المشكله</div>
       <div>{goal.goal_desc}</div>
       <hr />

       <div className="in">
        {initiatives.map((item,index) => {
            return(
                <div className="init-card" key={index}>
                 
                   <div className="title">
                   <div className="points">
         <div></div>
         <div></div>
         <div></div>
       <div className="links-list">
        <Link to={`/initiative`}> تعديل</Link>
        <button onClick={()=>deleteButton(item.id)}>حذف</button>
       </div>
       </div>
       <div>
       {item.title}
       </div>
                    
                    
                    </div>
                   <div className="desc">{item.desc}</div>
                   <div className="ath">
                    الأثر
                   </div>
                </div>
            )
                
        } )}
       </div>
    </div>
  )
}

export default Initiatives