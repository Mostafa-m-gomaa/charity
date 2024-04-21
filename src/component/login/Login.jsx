import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import loginImg from "../../assets/login.png";
import logoImg from "../../assets/theLogo.png";
import "react-toastify/dist/ReactToastify.css";
import submit from "../../assets/submit.png";

const Login = () => {
  const history = useNavigate();
  const { route ,setLoader ,setLogin} = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  const handleLogin = async (event) => {
   
    event.preventDefault();
    setLoader(true);
   if(!isOnline){
      toast.error("you are offline")
      setLoader(false)
    }
    try {
      const response = await fetch(`${route}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify({
          org_name: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      console.log(response);
      setLoader(false);
      if (response.user && response.user.canWork === 0) {
        toast.error("الحساب الخاص بك معطل يرجي التواصل مع الادارة");
      } else {
        if (response.token) {
          sessionStorage.setItem("token", response.token);
          sessionStorage.setItem("login", true);
          if (response.user) {
            sessionStorage.setItem("email", response.user.email);
            sessionStorage.setItem("name", response.user.org_name);
            sessionStorage.setItem("id", response.user.id);
            sessionStorage.setItem("role", response.user.role);
            sessionStorage.setItem("phone", response.user.phone);
            sessionStorage.setItem("logo", response.user.logo);
            if (response.user.role === 1) {
              history("/admin");
            } else if (response.user.role === 0) {
              history("/goals");
            }
          }
          setLogin(true);
        } else if(response.error ==="Invalid credentials") {
          toast.error("البريد الالكتروني او كلمة المرور غير صحيحة");
          
        }
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login">
      <div className="shape"></div>
      <div className="login-img-container">
      <img src={loginImg} alt="" />
      <Link to="">don`t have account ? sign up</Link>
      </div>

      <div class="container">
        <div className="form-cont">
          <img src={logoImg} alt="" />
          <h2>تسجيل الدخول</h2>
        {/* <form action="" class="form" onSubmit={handleLogin}>
          <input
            required=""
            class="input"
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          />
          <input
            required=""
            class="input"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="Password"
          />
          {/* <span class="forgot-password"><a href="#">Forgot Password ?</a></span> */}
          {/* <input class="login-button" type="submit" value="Sign In" />
    
        </form> */} 
        <div class="login-box">
 
 <form onSubmit={handleLogin}>
   <div class="user-box">
     <input type="text"  onChange={(e) => setEmail(e.target.value)} name="" required="" />
     <label>Username</label>
   </div>
   <div class="user-box">
     <input type="password" name="" required=""    onChange={(e) => setPassword(e.target.value)} />
     <label>Password</label>
   </div>
   <div className="submit-btn">

   <button type="submit">Login</button>
   <img src={submit} alt="" />
   </div>
 </form>
</div>

        </div>
 
      </div>
    </div>
  );
};

export default Login;
