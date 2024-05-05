import React from 'react'
import './init.css'
import { useState ,useContext , useEffect } from 'react';
import { AppContext } from '../../App';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import whatIm from '../../assets/what.png'
import whoIm from '../../assets/who.png'
import howIm from '../../assets/how.png'
import addIm from '../../assets/add.png'
import dangerIm from '../../assets/danger.png'
import { useParams } from 'react-router-dom';

const AddInitiative = () => {
  const mostadama =["القضاء على الفقر" ,"القضاء التام على الجوع" , "الصحة الجيدة والرفاه" , "التعليم الجيد" , "المساواة بين الجنسين" ,"المياه النظيفة والنظافة الصحية" ,"طاقة نظيفة وبأسعار معقولة" , 
"العمل اللائق ونمو الاقتصاد" , "الصناعة والابتكار والهياكل الأساسية" , "الحد من أوجه عدم المساواة" , "مدن ومجتمعات محلية مستدامة" , "الإنتاج والإستهلاك المستدام" , "العمل المناخي" , "الحياة تحت الماء" , "الحياة في البر" , " السلام والعدل والمؤسسات القوية" , "الشركات من أجل الأهداف"  ]

  const [watanya1,setWatanya1]=useState([])
  const [watanya2,setWatanya2]=useState([])
  const [watanya3,setWatanya3]=useState([])

    const {route ,setLoader ,setLogin}=useContext(AppContext)
        const [formData, setFormData] = useState([
          { output_title: '', output_desc: '', calc_way: '', target: '' ,achieved_targets:""},
        ]);
        const [inputsData, setInputsData] = useState([
          { entry : '' , entry_desc : ''}
        ]);
        const [activities , setActivities] = useState([
          { activity : '' , activity_desc : ''}
        ]);
        const [impacts , setImpacts] = useState([
          { impact : '' , impact_desc : ''}
        ]);
        const [workPlan , setWorkPlan] = useState([
          { band : '' , achievement_period : '' , cost : ''}
        ]);
        const [justifications,setJustification] = useState([
          { title : '' }
        ]);
        const param =useParams()
        const [id, setId] = useState(param.id);
        const [problem, setProblem] = useState("")
        const [title, setTitle] = useState("")
        const [budget,setBudget] = useState("")
        const [description, setDescription] = useState("")
        const [nationalGoal, setNationalGoal] = useState("")
        const [stage1, setStage1] = useState("")
        const [stage2, setStage2] = useState("")
        const [stage3, setStage3] = useState("")
        const [growGoal, setGrowGoal] = useState("")
        const [growGoalDesc, setGrowGoalDesc] = useState("")
        const [googleLink, setGoogleLink] = useState("")
        const [image, setImage] = useState(null);
        const [strategy_type, setStrategyType] = useState(1)




        const [showFives, setShowFives] = useState(true);
        const [showChanging, setShowChanging] = useState(false);

        const [what, setWhat] = useState("");
        const [who, setWho] = useState("");
        const [how, setHow] = useState("");
        const [add, setAdd] = useState("");
        const [danger, setDanger] = useState("");

        const handleImageChange = (event) => {
            const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
          setImage(file);
        } else {
          setImage(null);
        }
        };

        const changingFives =(e)=>{
            if(e.target.value === "five"){
                setShowFives(true)
                setShowChanging(false)
                setStrategyType(1)
            }
            else{
                setShowChanging(true)
                setShowFives(false)
                setStrategyType(0)
            }
        }
  
      
        const handleInputChange = (index, field, value) => {
          const updatedFormData = [...formData];
          updatedFormData[index][field] = value;
          setFormData(updatedFormData);
        };
      
        const handleJustificationChange = (index, field, value) => {
          const updatedFormData = [...justifications];
          updatedFormData[index][field] = value;
          setJustification(updatedFormData);
        };
        const handleWorkPlanChange = (index, field, value) => {
          const updatedFormData = [...workPlan];
          updatedFormData[index][field] = value;
          setWorkPlan(updatedFormData);
        };
        const handleInputDataChange = (index, field, value) => {
          const updatedFormData = [...inputsData];
          updatedFormData[index][field] = value;
          setInputsData(updatedFormData);
        };
        const handleActivitiesChange = (index, field, value) => {
          const updatedFormData = [...activities];
          updatedFormData[index][field] = value;
          setActivities(updatedFormData);
        };
        const handleImpactChange = (index, field, value) => {
          const updatedFormData = [...impacts];
          updatedFormData[index][field] = value;
          setImpacts(updatedFormData);
        };
      
        const handleAddField = () => {
          setFormData([...formData, { output_title: '', output_desc: '', calc_way: '', target: '' ,achieved_targets:"" }]);
        };
        const handleAddWorkPlanField = () => {
          setWorkPlan([...workPlan, { band: '',achievement_period: '', cost: ''}]);
        };
        const handleAddJustificatiomField = () => {
          setJustification([...justifications, { title :''}]);
        };
        const handleAddFieldInputs = () => {
          setInputsData([...inputsData,  { entry : '' , entry_desc : ''}]);
        };
        const handleAddFieldActivities = () => {
          setActivities([...activities,  { activity : '' , activity_desc : ''}]);
        };
        const handleAddFieldImpacts = () => {
          setImpacts([...impacts,  { impact : '' , impact_desc : ''}]);
        };
      
        const handleRemoveField = (index) => {
          const updatedFormData = [...formData];
          updatedFormData.splice(index, 1);
          setFormData(updatedFormData);
        };
        const handleRemoveJustification = (index) => {
          const updatedFormData = [...justifications];
          updatedFormData.splice(index, 1);
          setJustification(updatedFormData);
        };
        const handleRemoveWorkPlan = (index) => {
          const updatedFormData = [...workPlan];
          updatedFormData.splice(index, 1);
          setWorkPlan(updatedFormData);
        };
        const handleRemoveFieldInputs = (index) => {
          const updatedFormData = [...inputsData];
          updatedFormData.splice(index, 1);
          setInputsData(updatedFormData);
        };
        const handleRemoveFieldActivities = (index) => {
          const updatedFormData = [...activities];
          updatedFormData.splice(index, 1);
          setActivities(updatedFormData);
        };
        const handleRemoveFieldImpacts = (index) => {
          const updatedFormData = [...impacts];
          updatedFormData.splice(index, 1);
          setImpacts(updatedFormData);
        };

        const handleSubmit = async (event) => {
            event.preventDefault();
            setLoader(true)
            console.log(workPlan)

            const form = new FormData();
            form.append('goal_id', id);
            form.append('title', title);
            form.append('desc', description);
            form.append('problem', problem);
            form.append('budget', budget);
            form.append('image', image);
            form.append('national_goal',nationalGoal);
            form.append('stage1', stage1);
            form.append('stage2', stage2);
            form.append('stage3', stage3);
            form.append('grow_goal', growGoal);
            form.append('grow_goal_desc', growGoalDesc);
            form.append('strategy_type', strategy_type);
        

            form.append(`plan`, JSON.stringify(workPlan));
            form.append(`justifications`, JSON.stringify(justifications));
            form.append(`outputs`, JSON.stringify(formData));
            if(strategy_type === 1){
              form.append('what', what);
              form.append('who', who);
              form.append('how_much', how);
              form.append('contributes', add);
              form.append('risks', danger);
        
            }
            else if(strategy_type === 0){
              form.append(`activities`, JSON.stringify(activities));
              form.append(`impacts`, JSON.stringify(impacts));
              form.append(`entries`, JSON.stringify(inputsData));
            }

            try {
              const response = await fetch(`${route}/api/initiative`, {
                method: 'POST',
            
                headers:{
                  "Authorization" :`Bearer ${sessionStorage.getItem("token")}` ,
          
                },
                body: form,
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
          toast.success("تمت الأضافة")
          setRefresh(!refresh)
          history(`/initiative/${id}`)
              } else {
                console.log(response)
                toast.error("هناك خطأ")
              }
            } catch (error) {
           
             
            }
          };
                


            
         const [nationalGoals, setNationalGoals] = useState([]);



        
          useEffect(() => {
            fetch(`${route}/api/nationalGoals` ,{
                headers :{
                    "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(data => {
                  
                    if(data.data){
                        setNationalGoals(data.data)
                    }
                });
        }, []);

        const nationalGoalsChange =(id,title)=>{
          setNationalGoal(title)
      
          fetch(`${route}/api/nationalGoals/${id}` ,{
            headers :{
                "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
             
                if(data.data){
           setWatanya1(data.data.stages)
                }
            });
        }
          
        const stageOneChange =(id,title)=>{
          setStage1(title)
        
          fetch(`${route}/api/stage1/${id}` ,{
            headers :{
                "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
              
                if(data.data){
           setWatanya2(data.data.stages)
                }
            });
        }
        const stageTwoChange =(id,title)=>{
          setStage2(title)
          console.log(title)
          fetch(`${route}/api/stage2/${id}` ,{
            headers :{
                "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.data){
           setWatanya3(data.data.stages)
                }
            });
        }
          
            
       
        
  return (
    <div className="initiative">
       <h2>اٍضافة مبادرة جديد</h2>
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="">
                المشكلة
                <input type="text" onChange={(e)=>setProblem(e.target.value)} />
            </label>
            <div>
            <label htmlFor="">
                عنوان المبادرة
                <input type="text" onChange={(e)=>setTitle(e.target.value)} /> </label>
            <label htmlFor="">
              ميزانية المبادرة
                <input type="text" onChange={(e)=>setBudget(e.target.value)} /> </label>

            </div>
            <label htmlFor="">
                وصف المبادرة
               <textarea name="" onChange={(e)=>setDescription(e.target.value)} id="" cols="30" rows="10"></textarea> </label>
               <div className='relational'>
                <label htmlFor="">
                ارتباط باهداف الوطنية 
                <select name="" id="" onChange={(e) => nationalGoalsChange(e.target.value, e.target.selectedOptions[0].text)}>
    <option value="">اختر</option>
    {nationalGoals.map((goal) => {
        return (
            <option key={goal.id} value={goal.id}>{goal.title}</option>
        );
    })}
</select>

                </label>
                <label htmlFor="">
                المرحلة الأولي
                <select name="" id="" onChange={(e) => stageOneChange(e.target.value, e.target.selectedOptions[0].text)}>
    <option value="">اختر</option>
    {watanya1.map((goal) => {
        return (
            <option key={goal.id} value={goal.id}>{goal.title}</option>
        );
    })}
</select>
                </label>
                <label htmlFor="">
             المرحلة الثانيه
                <select name="" id="" onChange={(e)=>stageTwoChange(e.target.value, e.target.selectedOptions[0].text)}>
                <option value="fewfew">اختر</option>
                    {watanya2.map((item,index)=>{
                        return(
                            <option key={index} value={item.id}>{item.title}</option>
                        )
                    })}
                </select>
                </label>
                <label htmlFor="">
المرحلة الثالثة              <select name="" id="" onChange={(e)=>setStage3(e.target.value)}>
<option value="fewfew">اختر</option>
                    {watanya3.map((item,index)=>{

                        return(
                            <option key={index} value={item.title}>{item.title}</option>
                        ) 
                    }
                    )}
                </select>
                </label>
               </div>
               <div className='relational-goal'>
                <label htmlFor="">
                ارتباط بأهداف التنمية المستدامة :
                <select name="" id="" onChange={(e)=>setGrowGoal(e.target.value)}>
                    <option value="fwefew">اختر</option>
                    {mostadama.map((item,index)=>{
                        return(
                            <option key={index} value={item}>{item}</option>
                        )
                    })}
                </select>
                </label>
            
             
                <label htmlFor="" className='most'>

الشرح          <input type="text" onChange={(e)=>setGrowGoalDesc(e.target.value)} />
                </label>
               </div>
               <div>المخرجات</div>
          
                 {formData.map((data, index) => (
        <div key={index} className="the-outputs">
          <label>
            المخرج:
            <input
              type="text"
              value={data.output}
              onChange={(e) => handleInputChange(index, 'output_title', e.target.value)}
            />
          </label>
          <label>
            وصف المخرج:
            <input
              type="text"
              value={data.description}
              onChange={(e) => handleInputChange(index, 'output_desc', e.target.value)}
            />
          </label>
          <label>
            طريقة احتساب
            <select
              value={data.calculationMethod}
              onChange={(e) => handleInputChange(index, 'calc_way', e.target.value)}
            >
              <option value="">اختر</option>
              <option value="شهري">شهري</option>
              <option value="ربعي">ربعي</option>
              <option value="سنوي">سنوي</option>
            </select>
          </label>
          <label>
            الهدف
            <input
              type="text"
              placeholder="الهدف رقما"
              value={data.goal}
              onChange={(e) => handleInputChange(index, 'target', e.target.value)}
            />
          </label>
          <label>
            الهدف المحقق
            <input
              type="text"
              placeholder="الهدف المحقق"
          
              onChange={(e) => handleInputChange(index, 'achieved_targets', e.target.value)}
            />
          </label>
          <div className="add" onClick={handleAddField}>
        +
      </div>
          {index > 0 && <div className="remove add" onClick={() => handleRemoveField(index)}>-</div>}
        </div>
      ))}
      <div> منهجية إدارة وقياس اثر </div>
      <label htmlFor="">

      <select
  name=""
  id=""
  onChange={changingFives}
>
  <option value="">اختر</option>
  <option value="five">الأبعاد الخمسة</option>
  <option value="change">نظرة التغيير</option>
</select>
      </label>
    {showFives ?   <div className="fives-cont">

     
<label className="fives">
  <input type="text" onChange={(e)=>setWhat(e.target.value)} placeholder='ماذا' name="" id="" />
  <div>ماذا 
<img src={whatIm} alt="" />
  </div>
</label>
  <label className="fives">
  <input type="text" placeholder='من' onChange={(e)=>setWho(e.target.value)} name="" id="" />
  <div>من 
<img src={whoIm} alt="" />
  </div>
  </label>
  <label className="fives">
  <input type="text" onChange={(e)=>setHow(e.target.value)} placeholder='كم' name="" id="" />
  <div>كم
<img src={howIm} alt="" />

  </div>
  </label>
  <label className="fives">
  <input type="text" onChange={(e)=>setAdd(e.target.value)} placeholder='المساهمة' name="" id="" />
  <div>المساهمة
<img src={addIm} alt="" />

  </div>
  </label>
  <label className="fives">
  <input type="text" placeholder='المخاطر' onChange={(e)=>setDanger(e.target.value)} name="" id="" />
  <div>المخاطر
<img src={dangerIm} alt="" />

  </div>
  </label>
  </div> : null}
      {showChanging ?  <div className="changing">
            <div className="inputs">

            {inputsData.map((data,index)=>{
                return(
                    <div className="input" key={index}>
                        <div className="labels">
                            <label htmlFor="">
                                المدخلات
                                <input type="text" onChange={(e)=>handleInputDataChange(index,"entry",e.target.value)} />
                            </label>
                            <label htmlFor="">
                                وصف المدخلات
                                <input type="text" onChange={(e)=>handleInputDataChange(index,"entry_desc",e.target.value)} />
                            </label>
                        </div>
                        <div className="add" onClick={handleAddFieldInputs}>
                            +
                        </div>
                        {index === 0 ? null :     <div className="add" onClick={handleRemoveFieldInputs}>
                            -
                        </div>}
                    </div>
                )
            })}
            </div>
            <div className="inputs">

            {impacts.map((data,index)=>{
                return(
                    <div className="input" key={index}>
                        <div className="labels">
                            <label htmlFor="">
                              الاثر
                                <input type="text" onChange={(e)=>handleImpactChange(index,"impact",e.target.value)} />
                            </label>
                            <label htmlFor="">
وصف الاثر                                <input type="text" onChange={(e)=>handleImpactChange(index,"impact_desc",e.target.value)} />
                            </label>
                        </div>
                        <div className="add" onClick={handleAddFieldImpacts}>
                            +
                        </div>
                        {index === 0 ? null :     <div className="add" onClick={handleRemoveFieldImpacts}>
                            -
                        </div>}
                    </div>
                )
            })}
            </div>
            <div className="inputs">

            {activities.map((data,index)=>{
                return(
                    <div className="input" key={index}>
                        <div className="labels">
                            <label htmlFor="">
                                النشاط
                                <input type="text" onChange={(e)=>handleActivitiesChange(index,"activity",e.target.value)} />
                            </label>
                            <label htmlFor="">
                                وصف النشاط
                                <input type="text" onChange={(e)=>handleActivitiesChange(index,"activity_desc",e.target.value)} />
                            </label>
                        </div>
                        <div className="add" onClick={handleAddFieldActivities}>
                            +
                        </div>
                        {index === 0 ? null :     <div className="add" onClick={handleRemoveFieldActivities}>
                            -
                        </div>}
                    </div>
                )
            })}
            </div>
        </div>
       : null} 


     
<div>خطة العمل</div>
<div className="inputs">
{workPlan.map((data,index)=>{
    return(
        <div className="input" key={index}>
            <div className="labels">
                <label htmlFor="">
                    البند
                    <input type="text" onChange={(e)=>handleWorkPlanChange(index,"band",e.target.value)} />
                </label>
                <label htmlFor="">
مدة الانجاز                    <input type="text" onChange={(e)=>handleWorkPlanChange(index,"achievement_period",e.target.value)} />
                </label>
                <label htmlFor="">
التكلفه                 <input type="text" onChange={(e)=>handleWorkPlanChange(index,"cost",e.target.value)} />
                </label>
            </div>
            <div className="add" onClick={handleAddWorkPlanField}>
                +
            </div>
            {index === 0 ? null :     <div className="add" onClick={handleRemoveWorkPlan}>
                -
            </div>}
        </div>
    )
})}
</div>
<div>المسوغات</div>
<div className="inputs">
{justifications.map((data,index)=>{
    return(
        <div className="input" key={index}>
            <div className="labels">
                <label htmlFor="">
                    العنوان
                    <input type="text" onChange={(e)=>handleJustificationChange(index,"title",e.target.value)} />
                </label>
 
            </div>
            <div className="add" onClick={handleAddJustificatiomField}>
                +
            </div>
            {index === 0 ? null :     <div className="add" onClick={handleRemoveJustification}>
                -
            </div>}
        </div>
    )
})}
</div>
<div>صورة للمبادرة</div>
<input type="file" className='file'  onChange={handleImageChange}  />



  
       
          
            <button type='submit'>حفظ</button>
        </form>
        </div>
  )
}

export default AddInitiative