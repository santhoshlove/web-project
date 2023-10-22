import Login from "./page/Login";
import RegisterPage from "./page/RegisterPage";
import DashboardPage from "./page/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <Routes>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<DashboardPage/>}/>
          <Route path="/" element={<h1>Home</h1>}/>

         </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
