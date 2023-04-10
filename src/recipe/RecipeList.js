import React, {useEffect, useState} from 'react'
import Axios from 'axios';

import Recipe from './Recipe'

export default function RecipeList() {
    const[recipes,setRecipes]= useState([])
    const [isEdit, setIsEdit] = useState(false);
    const [currentRecipe,setCurrentRecipe]= useState("");

    useEffect(()=>{
        loadRecipeList()
       


    }, [])

    // Recipe list 
    const loadRecipeList = () => {

    
        Axios.get('recipe/index')
        .then((response)=>{
            console.log(response)
            setRecipes(response.data.recipes)
           
        })
        .catch((err)=>{
            console.log("Error retreiving Recipes")
            console.log(err)
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
            console.log("Error Editing Author")
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
            console.log("Error Delete Author")
            console.log(err)
        })
    }
    
     // console.log(recipes)

     const allRecipes = recipes.map((recipe,index)=>(
        <tr key={index}>
            <Recipe {...recipe} />


        </tr>
    ))
  return (
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
  )
}

