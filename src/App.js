
import React, { useState , useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Signin from './user/Signin';
import Signup from './user/Signup';
import Axios from 'axios'
import jwt_decode from 'jwt-decode'
import RecipeList from './recipe/RecipeList'
import RecipeDetail from './recipe/RecipeDetails';
import Calendar from 'react-calendar';
import CalendarPage from './calendar/CalendarPage';


export default function App() {
    
    const [isAuth, setIsAuth] = useState({})
    const [user, setUser] = useState({})
    
    useEffect(()=>{
        let token = localStorage.getItem("token")
        if(token != null){
          let user = jwt_decode(token)
    
          if(user){
            setIsAuth(true)
            setUser(user)
          }
          else if(!user){
            localStorage.removeItem("token")
            setIsAuth(false)
          }
        }
      }, [])  
    const registerHandler = (user) =>{
        Axios.post("auth/signup", user)
        .then(res =>{
         console.log(res)
        })
        .catch(err =>
         console.log(err)
         )
     }

     const logInHandler = (cred) => {
        Axios.post("auth/signin", cred)
        .then(res =>{
          //? save the token in local storage
          let token = res.data.token
          if(token != null){
            localStorage.setItem("token", token)
            let user = jwt_decode(token)
      
            setIsAuth(true)
            setUser(user)
          } 
        })
      
        .catch(err =>{
          console.log(err)
          setIsAuth(false)
        })
      }

      const onLogOutHandler = (e) =>{
        e.preventDefualt();
        setIsAuth(false)
        setUser(null)
      }
    

  return(
    <div>
        <Router>
        <div>
            <nav>
            <div>
                <Link to="/">Home</Link> &nbsp;
                <Link to="/signup">Signup</Link> &nbsp;
                <Link to="/signin">Signin</Link> &nbsp;
                <Link to="/logout" onClick={onLogOutHandler}>Logout?</Link> &nbsp;
                <Link to="/index">recipeList</Link> &nbsp;
                <Link to="/add">Add Recipe </Link> &nbsp;
                <Link to='/edit'>Edit Recipe</Link> &nbsp;
            </div>
            </nav>
        </div>
        <div>

            <Routes>
                <Route path="/" element={
                    <Signin login={logInHandler}></Signin>}>
                </Route>
                <Route path="/signup" element={<Signup register={registerHandler}/>}></Route>
                <Route path="/signin" element={<Signin login={logInHandler}/>}></Route>
                <Route path={`/recipe/:id`} element={<RecipeDetail/>}/>
            </Routes>
        </div>
        </Router>
      
        <RecipeList/> 
        <CalendarPage/>
    </div>

  
  )
}

