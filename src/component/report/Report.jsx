import React from 'react'
import './report.css'
import { useContext } from 'react'
import { AppContext } from '../../App'
import { useState ,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from '../profile/Profile'

const Report = () => {
    const {route,setLoader,login,setLogin,token,setToken} = useContext(AppContext);
    const param =useParams()
    const [goal,setGoal]=useState({})
    const [rels,setRels]=useState([])
    const [kes,setKes]=useState([])
    const [initiatives, setInitiatives] = useState([])
    const [showDownload, setShowDownload] = useState(false)
    const keys = [{
        value: "title" ,
        title: "العنوان"
    },
{
    value: "desc",
    title: "الوصف"
},
{
    value: "problem",
    title: "المشكلة"
},
{
    value:"budget",
    title:"الميزانية"
},
{
    value:"image",
    title:"الصورة"
},
{
    value:"google_sheet_link",
    title:"رابط جوجل شيت"
},
{
    value:"strategy_type",
    title:"نوع الاستراتيجية"
}
]
    const relational = [{
        value: "target" ,
        title: "الأهداف الوطنية و التنمية"
    },
{
    value: "plan",
    title: "خطة العمل"
},
{
    value: "output",
    title: "المخرجات"
},
{
    value:"jsutifications",
    title:"المسوغات"
}

]
    const [checkedValues, setCheckedValues] = useState([]);
    const [checkedValuesRel, setCheckedValuesRel] = useState([]);

    const handleCheckboxChange = (value, isChecked) => {
      if (isChecked) {
    
        setCheckedValues(prev => [...prev, value]);
      } else {
    
        setCheckedValues(prev => prev.filter(item => item !== value));
      }
      const keys = checkedValues.map(obj => obj.value);
      setKes(keys)
    };
    const handleCheckboxChangeRel = (value, isChecked) => {
        if (isChecked) {
    
            setCheckedValuesRel(prev => [...prev, value]);
        } else {
    
            setCheckedValuesRel(prev => prev.filter(item => item !== value));
        }
 
          
    };

    const prepareReport =()=>{
  
   
     setLoader(true)
      
        fetch(`${route}/api/initiative/showRelated/${param.id}`,{
            method:"PUT",
            headers:{
                "Authorization":`Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                relationNames:checkedValuesRel,
                keys:checkedValues
            })

        }).then(res => res.json())
            .then(data => {
                setLoader(false)
        console.log(data)
        if(data.error === "Token exoired" || data.msg === "Unauthorized action."){
            setLogin(false)
            sessionStorage.clear()
            history("/")
            }
            if(data.data){
                setInitiatives(data.data)
                setShowDownload(true)
            }
            else{
                toast.error("حدث خطأ")
            }
            })
    }

    

    useEffect(() => {
        fetch(`${route}/api/goals/${param.id}`,{
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
            setGoal(data.data)
            }
       
        })
    },[])

  return (
  <div className="report">
    <h1>تقرير الهدف</h1>
    <h1>{goal.title}</h1>
    <div className="checkboxes">


   {keys.map((key, index) => {
        const checkboxId = `cbk-${index}-65`; // Creating a unique ID based on the index
        return (
          <div className="checkbox-wrapper-65" key={index} onClick={()=>setShowDownload(false)}>
            <label htmlFor={checkboxId}>
              <input
                id={checkboxId}
                type="checkbox"
                value={key}
                onChange={(e) => handleCheckboxChange( key.value ,e.target.checked)}
              />
              <span className="cbx">
                <svg viewBox="0 0 12 11" height="11px" width="12px">
                  <polyline points="1 6.29411765 4.5 10 11 1"></polyline>
                </svg>
              </span>
              <span>{key.title}</span>
            </label>
          </div>
        );
      })}

   {relational.map((key, index) => {
        const checkboxId = `bk-${index}-65`; // Creating a unique ID based on the index
        return (
          <div className="checkbox-wrapper-65" key={index}>
            <label htmlFor={checkboxId}>
              <input
                id={checkboxId}
                type="checkbox"
                value={key}
                onChange={(e) => handleCheckboxChangeRel( key.value ,e.target.checked)}
              />
              <span className="cbx">
                <svg viewBox="0 0 12 11" height="11px" width="12px">
                  <polyline points="1 6.29411765 4.5 10 11 1"></polyline>
                </svg>
              </span>
              <span>{key.title}</span>
            </label>
          </div>
        );
      })}
    </div>




    
    <button className='prepare' onClick={prepareReport}>تجهيز التقرير</button>
    {showDownload ?  <div style={{
        width:"80%",
    }}>
<Profile data={goal} initiatives={initiatives} show={setShowDownload} />
    </div> : null}
  
  </div>
  )
}

export default Report