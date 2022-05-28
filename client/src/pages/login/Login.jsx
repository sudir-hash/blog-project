import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

// const URL = 'http://192.168.1.91:5000/api/auth'

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("userRef", userRef.current.value);
    console.log("passwordRef", passwordRef.current.value);


    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
       '/auth/login', 
        {
        username: userRef.current.value,
        password: passwordRef.current.value,
        },
        
      );
      console.log("res", res.data);
      if(res.data.isValidUser){
        window.location.href = "/";
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.username });
      }else{
        alert("Invalid Credentials");
        dispatch({ type: "LOGIN_FAILURE" });

      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }





  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        {/* //disabled={isFetching} */}
        <button className="loginButton" type="submit" >
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
