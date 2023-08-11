import Login from "./pages/Login/Login";
import "./App.css";
import QuoteCard from "./components/QuoteCard/QuoteCard";
import MainPage from "./pages/MainPage/MainPage";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Post from "./pages/Post/Post";
function App() {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Login/>}></Route>
        <Route path={"/quotes"} element={<ProtectedRoute><MainPage/></ProtectedRoute>}></Route>
        <Route path={"/post"} element={<ProtectedRoute><Post/></ProtectedRoute>}></Route>
      </Routes>

      <></>
    </div>
  );
}

export default App;
