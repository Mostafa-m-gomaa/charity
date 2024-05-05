import React, { useContext, useEffect, useState } from 'react'
import logoImg from "../../assets/theLogo.png";
import './admin.css'
import { AppContext } from '../../App';
import { toast } from "react-toastify";
import img from "../../assets/theLogo.png";
import { Link, useNavigate } from 'react-router-dom';
import AddState from './addState/AddState';
import AddNational from './nationalGoal/NationalGoal';
import Stage1 from './Stage1';
import Stage2 from './Stage2';
import Stage3 from './Stage3';

const Admin = () => {
    const {route ,setLoader ,setLogin , login}=useContext(AppContext)
    const [orgs,setOrgs]=useState("")
    const [email,setEmail]=useState("")
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [phone,setPhone]=useState("")
    const [color,setColor]=useState("")
    const [city,setCity]=useState("")
    const [image, setImage] = useState(null);
    const [refresh,setRefresh]=useState(false)
    const [orgId,setOrgId]=useState("")
    const [showConfirm ,setShowConfirm]=useState(false)
    const [showUpdate ,setShowUpdate]=useState(false)
    const [newPass ,setNewPass]=useState("")
    const history =useNavigate()

    const deleteCateg =()=>{
      setLoader(true)
      setShowConfirm(false)
      fetch(`${route}/api/org/${orgId}`,{
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
    const stop =(id)=>{
      setLoader(true)
      console.log(id)
      // const data = new FormData()
      // data.append("canWork",0)
      fetch(`${route}/api/org/${id}`,{
        method :"POST" ,
        headers :{
          "Authorization" :`Bearer ${sessionStorage.getItem("token")}` ,
          "Content-Type" : "application/json"
        } ,
        body :JSON.stringify({
          canWork : 0
        })
      })
      .then(res => res.json())
      .then(data => {
       
        if(data.error === "Token exoired"){
          setLogin(false)
          sessionStorage.clear()
          history("/")
        }
        setLoader(false)
        if(data.status === "success"){
  toast.success("تم الايقاف")
  setRefresh(!refresh)
        }
        else{
          toast.error("لم يتم الايقاف")
        }
      })
    }
    const activate =(id)=>{
      setLoader(true)
      console.log(id)
      // const data = new FormData()
      // data.append("canWork",0)
      fetch(`${route}/api/org/${id}`,{
        method :"POST" ,
        headers :{
          "Authorization" :`Bearer ${sessionStorage.getItem("token")}` ,
          "Content-Type" : "application/json"
        } ,
        body :JSON.stringify({
          canWork : 1
        })
      })
      .then(res => res.json())
      .then(data => {
       
        setLoader(false)
        if(data.error === "Token exoired"){
          setLogin(false)
          sessionStorage.clear()
          history("/")
        }
        if(data.status === "success"){
  toast.success("تم التنشيط")
  setRefresh(!refresh)
        }
        else{
          toast.error("لم يتم التنشيط")
        }
      })
    }
    const deleteButton =(id)=>{
      setOrgId(id)
      setShowConfirm(true)
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    } else {
      setImage(null);
    }
    };
    const logOut =(e)=>{
      sessionStorage.clear()
      setLogin(false)
    }
     
    const updateButton =(id)=>{
      setOrgId(id)
      setShowUpdate(true)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoader(true)
    
        const formData = new FormData();
        formData.append('org_name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('password', password);
        formData.append('city', city);
        formData.append('colors',color);
        formData.append("logo",image)
        
   
    
     
        try {
          const response = await fetch(`${route}/api/org/createOrg`, {
            method: 'POST',
        
            headers:{
              "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
            },
            body: formData,
          })
          .then(res=>res.json());
          setLoader(false)
        
          if(response.error === "Token exoired"){
            setLogin(false)
            sessionStorage.clear()
            history("/")
          }
          if (response.status=="Success") {
      console.log(response)
      toast.success("تمت الأضافة")
      setRefresh(!refresh)
          } else {
            console.log(response)
            toast.error("هناك خطأ")
          }
        } catch (error) {
       
         
        }
      };
    const handleSubmitUpdate = async (event) => {
        event.preventDefault();
        setLoader(true)
    
        const formData = new FormData();
        formData.append('Password', newPass);
        
        
   
    
     
        try {
          const response = await fetch(`${route}/api/org/updatePassword/${orgId}`, {
            method: 'POST',
        
            headers:{
              "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
            },
            body: formData,
          })
          .then(res=>res.json());
          setLoader(false)
          console.log(response)
          if(response.error === "Token exoired"){
            setLogin(false)
            sessionStorage.clear()
            history("/")
          }
          if (response.status=="success") {
      console.log(response)
      toast.success(response.msg)
      setRefresh(!refresh)
      setShowUpdate(false)
          } else {
            console.log(response)
            toast.error("هناك خطأ")
          }
        } catch (error) {
       
         
        }
      };
      useEffect(()=>{
 
   
fetch(`${route}/api/org`,{
  headers:{
    "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
  }
})
.then(res=>res.json())
.then(data=>{
  // console.log(data)
  if(data.error === "Token exoired"){
    setLogin(false)
    sessionStorage.clear()
    history("/")
  }
  if(data.status=="success"){
    setOrgs(data.data)
  }
})
      },[refresh])
      useEffect(() => {
        if(login){
            window.onpopstate = () => {
              history("/admin")
            };
          }
        }, [login, history]);
useEffect(()=>{
  if(!sessionStorage.getItem("token") || !sessionStorage.getItem("role")=== "1" ){
    history("/")
    sessionStorage.clear()
    setLogin(false)
  }
},[])

  return (
   <div className="admin">
    {showUpdate ? <div className="update">
      <form onSubmit={handleSubmitUpdate}>
        New Password
        <input type="text" placeholder='new password' onChange={(e)=>setNewPass(e.target.value)} />
        <button type='submit'>save</button>
      </form>
    </div> : null}
    
    {showConfirm ?   <div className="confirm">
    <div>هل انت متاكد انك تريد حذف هذا ؟</div>
    <div className="btns">
      <button onClick={deleteCateg} className='yes' >Yes</button>
      <button onClick={() => setShowConfirm(false)} className='no'>No</button>
    </div>
  </div> :null}
          <div className="shape"></div>
    <div className="container">
        <div className="admin-head">
            <h2 className="left">
    admin
            </h2>
            <Link to="/" onClick={logOut}>تسجيل الخروج </Link>
            <img src={logoImg} alt="" />
          
        </div>
        <h2>بيانات الجمعيات</h2>
        <h3>اضافة منظمة جديدة</h3>
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="">
                اسم المنظمة 
                <input type="text" onChange={(e)=>setName(e.target.value)} />
            </label>
            <label htmlFor="">
               الايميل
                <input type="text" onChange={(e)=>setEmail(e.target.value)} />
            </label>
            <label htmlFor="">
            رقم الهاتف
                <input type="text" onChange={(e)=>setPhone(e.target.value)} />
            </label>
            <label htmlFor="">
          كلمة السر
                <input type="text" onChange={(e)=>setPassword(e.target.value)} />
            </label>
            <label htmlFor="">
المدينة                <input type="text" onChange={(e)=>setCity(e.target.value)} />
            </label>
            <label htmlFor="">
اللون                <input type="text" onChange={(e)=>setColor(e.target.value)} />
            </label>
            <label htmlFor="">

اللوجو         
<input  type="file"  onChange={handleImageChange} />
            </label>
            <div className="sub-div">

            <button type='submit'>اضافة</button>
            </div>
        </form>
        <h3>الجمعيات</h3>
        <div className="all-orgs">
            {orgs && orgs.map((org,index)=>{
                return(
                    <div className="org" key={index}>
                      {/* <img src={img} alt="" /> */}
                      <img src={`${route}/storage/${org.logo}`} alt="" />
                        <h3>{org.org_name}</h3>
                        <p>Email:{org.email}</p>
                        <p>phone :{org.phone}</p>
                        <p>city : {org.city}</p>
                        <p>color : {org.colors}</p>
                        <div className="btns">

                        <button className="delete" onClick={()=>deleteButton(org.id)}>delete</button>
                        {org.canWork === 1 ?<button className="stop" onClick={()=>stop(org.id)} >stop</button> : <button onClick={()=>activate(org.id)} className="active" >activate</button>}
                        <button className='pass' onClick={()=>updateButton(org.id)}>update pass</button>
                        </div>
                    </div>
                )
            })}
        </div>

        <AddState />
        <AddNational />
        <Stage1 />
        <Stage2 />
        <Stage3 />

    </div>
   </div>
  )
}

export default Admin