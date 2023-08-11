import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "./Header.css";
export default function Header() {
  const { setToken } = useContext(AppContext);

  const navigation = useNavigate();

  function logOut() {
    localStorage.clear();
    setToken(null);
    navigation("/");
  }
  function post() {
    navigation("/post");
  }
  return (
    <div className="head-div">
      <h1>Quotes</h1>
      <button onClick={logOut}>Log out</button>
      <button onClick={post}>Post</button>
    </div>
  );
}
