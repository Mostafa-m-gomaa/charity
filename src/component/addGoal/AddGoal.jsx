import React from 'react'
import './addgoal.css'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../App'
import { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'

const AddGoal = () => {
    const {route,setLoader,login,setLogin,token,setToken} = useContext(AppContext);
    const [problem, setProblem] = useState("")
    const [title, setTitle] = useState("")
    const [status, setStatus] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const history =useNavigate()


    const handleSubmit = async (event) => {
      console.log(title,description,problem,status,image)

        event.preventDefault();
        setLoader(true)
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('goal_desc', description);
        formData.append('problem', problem);
        formData.append('status', status);
        formData.append('image', image);
 
        
   
    
     
        try {
          const response = await fetch(`${route}/api/goals`, {
            method: 'POST',
        
            headers:{
              "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
            },
            body: formData,
          })
          .then(res=>res.json());
          setLoader(false)
        
          if(response.error === "Token exoired" || response.msg === "Unauthorized action."){
            setLogin(false)
            sessionStorage.clear()
            history("/")
          }
          if (response.status==="success") {
      console.log(response)
      toast.success("تمت الأضافة")
      history("/goals")

          } else {
            console.log(response)
            toast.error("هناك خطأ")
          }
        } catch (error) {
       
         
        }
      };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    } else {
      setImage(null);
    }
    };



  return (
    <div className="add-goal">
        <h2>اٍضافة هدف جديد</h2>
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="">
                المشكلة
                <input type="text" onChange={(e)=>setProblem(e.target.value)} />
            </label>
         <div>
         <label htmlFor="">
              عنوان الهدف
                <input type="text" onChange={(e)=>setTitle(e.target.value)}/>
            </label>
            <label htmlFor="">
             الحالة
              <select name="" id="" onChange={(e)=>setStatus(e.target.value)}>
                <option value="خيرية">اختر</option>
                <option value="خيرية">خيرية</option>
                <option value="استثمارية">استثمارية</option>
              </select>
            </label>
         </div>
            <label htmlFor="">
                وصف الهدف
               <textarea name="" id="" cols="30" rows="10" onChange={(e)=>setDescription(e.target.value)}></textarea>
            </label>
            <label htmlFor="">
            صورة للمبادرة
            <input  type="file"  onChange={handleImageChange} />
            </label>
            <button type='submit'>حفظ</button>
        </form>
    </div>
  )
}

export default AddGoal