import style from  "./App.module.css"
import {Routes, Route} from "react-router-dom"
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail"
import Activity from './components/Form/Activity';
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Landing/Landing";
import UpdateActivity from "./components/UpdateActivity/UpdateACtivity";
import DeleteActivity from "./components/DeleteActivity/DeleteActivity";

function App() {


  return (
    <div className={style.App}>
      <div className={style.container}>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/CreateActivity' element={<Activity/>}/>
        <Route path='/updateActivity' element={<UpdateActivity/>}/>
        <Route path='/deleteActivity' element={<DeleteActivity/>}/>
      </Routes>   
      </div>
    </div>

  )
}

export default App
