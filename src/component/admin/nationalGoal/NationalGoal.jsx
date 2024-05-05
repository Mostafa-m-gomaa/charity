import React from 'react'
import '../addState/state.css'
import { useContext } from 'react'
import { AppContext } from '../../../App'
import { useState ,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const AddNational = () => {
    const {route,setLoader} = useContext(AppContext);
    const [status,setStatus]=useState("")
    const [allStatus,setAllStatus]=useState([])
const {refresh,setRefresh}=useContext(AppContext)

const deleteFunc =(id)=>{
    setLoader(true)
    fetch(`${route}/api/nationalGoals/${id}`,{
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
          const response = await fetch(`${route}/api/nationalGoals`, {
            method: 'POST',
        
            headers:{
              "Authorization" :`Bearer ${sessionStorage.getItem("token")}` ,
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                title : status
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
      console.log(response)
      toast.success("تمت الأضافة")
      setRefresh(!refresh)
      console.log(route)
      
          } else {
            console.log(response)
            toast.error("هناك خطأ")
          }
        } catch (error) {
       
         
        }


  
      };

      useEffect(() => {
        fetch(`${route}/api/nationalGoals` ,{
            headers :{
                "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.data){
                    setAllStatus(data.data)
                }
            });
    }, [refresh]);
  return (
   <div className="add-state">
        <h1>اضافة الأهداف الوطنية</h1>
        <form onSubmit={handleSubmit}>
        <button>اضافة</button>
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

export default AddNational