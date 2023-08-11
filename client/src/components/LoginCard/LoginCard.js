import React, { useState, useContext } from "react";
import "./LoginCard.css";
import { AppContext } from "../../context/AppContext";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
export default function LoginCard() {
  const { setToken, accessToken, token } = useContext(AppContext);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(VisibilityOffIcon);

  const navigation = useNavigate();

  const LoginSystem = async () => {
    try {
      const user = await axios.post("http://localhost:8000/sessions", {
        username: username,
        password: password,
      });
      const userInfo = await user.data;
      localStorage.setItem("token", userInfo.accessToken);
      setToken(userInfo.accessToken);
      navigation("/quotes");
      console.log(userInfo.accessToken)
      console.log(token)
      console.log(localStorage.getItem("token"))

    } catch (err) {
      localStorage.clear();
      setToken(null);
      console.log(err.message);
      setPassword("");
      setUsername("");
      toast.error("Invalid credentials !");
    }
  };
  function handleClick(e) {
    e.preventDefault();
    LoginSystem(username, password);
  }

  const handleToggle = () => {
    if (type === "password") {
      setIcon(VisibilityIcon);
      setType("text");
    } else {
      setIcon(VisibilityOffIcon);
      setType("password");
    }
  };
  return (
    <div className="login-card">
      <div>
        <Toaster position="top-center" />
      </div>
      <h2>Sign in</h2>
      <h5>Sign in to see, share and vote quotes!</h5>

      <form className="form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        ></input>
        <input
          type={type}
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        ></input>
        <button onClick={handleClick}>Sign in</button>
        {!password ? (
          <></>
        ) : type === "password" ? (
          <VisibilityOffIcon className="eye" onClick={handleToggle} />
        ) : (
          <VisibilityIcon className="eye" onClick={handleToggle} />
        )}
      </form>
    </div>
  );
}
