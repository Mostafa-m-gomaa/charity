import React, { useContext, useState, useEffect, createContext } from "react";
import { Route, Routes } from "react-router";
import './App.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./component/login/Login";
import "aos/dist/aos.css";
import AOS from "aos";
import Admin from "./component/admin/Admin";
import UserLayOut from "./component/userlayout/UserLayOut";
import Goals from "./component/goals/Goals";
import AddGoal from "./component/addGoal/AddGoal";
import AddInitiative from "./component/add intiative/AddInitiative";
import Initiatives from "./component/initiatives/Initiatives";
import Report from "./component/report/Report";
export const AppContext = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState("");
  const [loader, setLoader] = useState(false);
  const [route, setRoute] = useState("https://api.atharplus.com");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      setLogin(true);
    }
  }, [login]);
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <AppContext.Provider value={{route ,setLoader ,
    login ,
    setLogin ,
    token ,
    setToken}}>
    <>
    <ToastContainer />
    {loader ?
    <div className="loader-cont">

<div class="loader"></div>
    </div>
    :null}
    <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="" element={<UserLayOut/>} >
            <Route path="/goals" element={<Goals />} />
            <Route path="/add-goal" element={<AddGoal/>} />
            <Route path="/add-goal/:id" element={<AddInitiative/>} />
            <Route path="/initiative/:id" element={<Initiatives/>} />
            <Route path="/report/:id" element={<Report/>} />

          </Route>

    </Routes>
 

    </>
    </AppContext.Provider>
  )
}

export default App
