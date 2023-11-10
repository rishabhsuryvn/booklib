import "bootstrap/dist/css/bootstrap.min.css";
import {Route, Routes} from "react-router-dom";
import './App.css';
import MyNavbar from "./components/MyNavbar";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import List from "./pages/List";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ViewOrder from "./pages/ViewOrder";

function App() {
  return( 
<div>
 <MyNavbar/>
  <Routes>
    <Route path="/" element ={<Home/>}/>
    <Route path="/login" element ={<Login/>}/>
    <Route path="/register" element ={<Register/>}/>
    <Route path="/book/list" element ={<List/>}/>
    <Route path="/book/view/:bookId" element ={<Detail/>}/>
    <Route path="/book/orders" element ={<ViewOrder/>}/>
  </Routes>
  </div>
  );
}

export default App;
