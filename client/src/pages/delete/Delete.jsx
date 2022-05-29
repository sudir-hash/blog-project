import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { useContext } from "react";
import "./Delete.css";
const URL = 'http://192.168.1.91:5000/api/auth'

export default function Register() {
  const { user, dispatch } = useContext(Context);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    console.log(email)
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    console.log("deleting"+username)

    if(email === 'No' ){
      try {
        const res = await axios.delete(
        '/user/delete/', {
          data:{username:username,
          password:password,
        }
        });
        if(res.data.status==="success"){
          dispatch({ type: "LOGOUT" });

        }
        // dispatch({  type: "LOGOUT", payload: res.data });
        // res.data && window.location.replace("/login");
      } catch (err) {
        setError(true);
      }
      
    }

  };
  return (
    <div className="register">
      <span className="registerTitle">Delete Account</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <p>Are You Sure You Want to Delete your account</p>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Delte Blogs</label>
        <select
          className="registerInput"
          onChange={(e) => setEmail(e.target.value)}
          >
          <option value="Yes">Yes,I would like to Delete</option>
          <option value="No">No ,Keep it</option>
            </select>
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Delete
        </button>
      </form>
      {/* <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>} */}
    </div>
  );
}
