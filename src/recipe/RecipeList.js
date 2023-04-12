import React, {useEffect, useState} from 'react'
import Axios from 'axios';
import Recipe from './Recipe'
import RecipeEditForm from './RecipeEditForm';
import RecipeCreateForm from './RecipeCreateForm';
import RecipeDetails from './RecipeDetails';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import { Navigate } from "react-router-dom";


export default function RecipeList() {
    const[recipes,setRecipes]= useState([])
    const [isEdit, setIsEdit] = useState(false);
    const [currentRecipe,setCurrentRecipe]= useState("");

    useEffect(()=>{
        loadRecipeList()
       


    }, [])

    // Recipe list 
    const loadRecipeList = () => {

    
        Axios.get('recipe/index', 
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then((response)=>{
            console.log(response)
            setRecipes(response.data.recipes)
           
        })
        .catch((err)=>{
            console.log("Error retreiving Recipes")
            console.log(err)
        })
    }

    // Add Recipe
    const addRecipe = (recipe) => {
       
        Axios.post("recipe/add", recipe, 
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }
        )
        .then(res =>{
            console.log('Recipe Added successfully !!')
            loadRecipeList();
        })

        .catch(err => {
            console.log("Error retreiving Recipe")
            console.log(err)
        })
    }

      //Details recipe 
      const detailRecipe = (id) => {
        Axios.get(`recipe/detail?id=${id}`, 
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log(res.data.recipe)
            let recipe = res.data.recipe
            console.log("Loaded recipe Information")
            setCurrentRecipe(recipe)
            // Navigation with recipe id

        })
    }

    //Edit recipe 
    const editView = (id) => {
        Axios.get(`recipe/edit?id=${id}`, 
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log(res.data.recipe)
            let recipe = res.data.recipe
            console.log("Loaded recipe Information")
            setIsEdit(true)
            setCurrentRecipe(recipe)
        })
    }

    const editRecipe = (recipe) => {
        Axios.put("recipe/update" , recipe , 
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res =>{
            console.log("Recipe Updated Successfully!!")
            console.log(res);
            loadRecipeList();
        })
        .catch(err=> {
            console.log("Error Editing recipe")
            console.log(err)
        })
    }


    // Delete Recipe 
    
    const deleteRecipe = (id) => {
        Axios.delete(`recipe/delete?id=${id}`, 
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log('Record Delete Succesfull !!')
            console.log(res);
            loadRecipeList();
        })

        .catch(err=> {
            console.log("Error Delete Recipe")
            console.log(err)
        })
    }
    
     // console.log(recipes)

     const allRecipes = recipes.map((recipe,index)=>(
        <tr key={index}>
            <Recipe {...recipe} editView={editView} deleteRecipe={deleteRecipe} detailRecipe={detailRecipe}  />


        </tr>
    ))
  return (
    <div>
      
            <div>
              
            </div>
            <div>
                <Routes>
                    <Route path="/index" element={
                        <div>
                        <h1>Recipe List</h1>
                       <div>
                         <table>
                             <tbody>
                                 <tr>
                                  <th> name</th>
                                  <th>ingredient</th>
                                  <th>step</th>
                                 </tr>
                                {allRecipes}
                             </tbody>
                         </table>
                       </div>
                      
                       
                     </div>

                    }></Route>
                    <Route path='/add' element={
                        <div>
                        
                            <RecipeCreateForm addRecipe={addRecipe}/>
                           
                       </div>
                        
                        
                    }></Route>
                    
                    <Route path='/edit' element={
                        <div>
                         <div>
                        <h1>Recipe List</h1>
                       <div>
                         <table>
                             <tbody>
                                 <tr>
                                  <th> name</th>
                                  <th>ingredient</th>
                                  <th>step</th>
                                 </tr>
                                {allRecipes}
                             </tbody>
                         </table>
                       </div>
                       {(!isEdit) ?
             <RecipeCreateForm addRecipe={addRecipe}/>
                 :
             <RecipeEditForm key={currentRecipe._id} recipe = {currentRecipe}
               editRecipe={editRecipe}  />
                            }
                       
                     </div>
                            
                    
                           
                       </div>
                        
                        
                    }>

                    </Route>
                    <Route path="RecipeDetails" element={<RecipeDetails/>} />
                    
                </Routes>
                
            </div>
            
      
        
    </div>
    
  )
}