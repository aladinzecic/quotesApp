import React from "react";
import "./ProtectedRoute.css"
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const navigation = useNavigate();

  if (token) return <>{children}</>;
  else
    return (
      <div className="protected-div">
        <h1 >You must be logged in to access this page</h1>
        <button onClick={()=>{
          navigation("/")
        }}>
Go to log in page
        </button>
        <svg className='svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#20df7f" fill-opacity="1" d="M0,224L80,213.3C160,203,320,181,480,186.7C640,192,800,224,960,240C1120,256,1280,256,1360,256L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
    <svg className='svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#28595e" fill-opacity="1" d="M0,224L60,234.7C120,245,240,267,360,277.3C480,288,600,288,720,261.3C840,235,960,181,1080,181.3C1200,181,1320,235,1380,261.3L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
      </div>
    );
}
