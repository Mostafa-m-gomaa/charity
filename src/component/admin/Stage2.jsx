import React from 'react'
import './addState/state.css'
import { useContext } from 'react'
import { AppContext } from '../../App'
import { useState ,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Stage2 = () => {
    const {route,setLoader , refresh ,setRefresh} = useContext(AppContext);
    const [status,setStatus]=useState("")
    const [allStatus,setAllStatus]=useState([])
// const [refresh,setRefresh]=useState(false)
const [nationals,setNationals]=useState([])
const [goalId,setGoalId]=useState("")

const deleteFunc =(id)=>{
    setLoader(true)
    fetch(`${route}/api/stage2/${id}`,{
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoader(true)     
        try {
          const response = await fetch(`${route}/api/stage2`, {
            method: 'POST',
        
            headers:{
              "Authorization" :`Bearer ${sessionStorage.getItem("token")}` ,
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                title : status ,
                stage1_id : goalId
            })
          })
          .then(res=>res.json());
          setLoader(false)
        
          if(response.error === "Token exoired"){
            setLogin(false)
            sessionStorage.clear()
            history("/")
          }
          if (response.status=="success") {
  
      toast.success("تمت الأضافة")
      setRefresh(!refresh)
      
      
          } else {
         
            toast.error("هناك خطأ")
          }
        } catch (error) {
       
         
        }


  
      };

      useEffect(() => {
        fetch(`${route}/api/stage2` ,{
            headers :{
                "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
              
                if(data.data){
                    setAllStatus(data.data)
                }
            });
    }, [refresh]);
    useEffect(() => {
        fetch(`${route}/api/stage1` ,{
            headers :{
                "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
             
                if(data.data){
                    setNationals(data.data)
                }
            });
    }, [refresh]);
  return (
   <div className="add-state">
        <h1>اضافه المرحلة الثانيه</h1>
        <form onSubmit={handleSubmit}>
        <button>اضافة</button>
        <select onChange={(e)=>setGoalId(e.target.value)}>
            <option>اختر المرحلة الاولي</option>
            {nationals.map((national,index) => {
                return(
                    <option key={index} value={national.id}>{national.title}</option>
                )
            })}
        </select>
       
        <input type="text" onChange={(e)=>setStatus(e.target.value)} />
        </form>
        <div className="status">
            {allStatus.map((status,index) => {
                return(
                    <div key={index} className="status-item">
                        <p>{status.title}</p>
                        <button className="delete" onClick={()=>deleteFunc(status.id)}>delete</button>
                    </div>
                )
            })}
        </div>
        <hr />
   </div>
  )
}

export default Stage2