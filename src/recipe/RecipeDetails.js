import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap'

export default function RecipeDetails(props) {
    const id  = useParams().id; // Fetches the recipe id from the URL
    console.log(`the id is ${id}`);
    

  const [recipe, setRecipe] = useState({});
  
  useEffect(() => {
    detailRecipe(id)
  }, [id]);

    //Details recipe 
    const detailRecipe = (id) => {
        console.log(id)
        Axios.get(`/recipe/detail?id=${id}`, 
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log(res.data.recipe)
            let recipe = res.data.recipe
            console.log("Loaded recipe Information")
            setRecipe(recipe)
            // Navigation with recipe id
        })
        .catch(err =>{
            console.log(err)
        })
    }
    console.log(`recipe/detail?id=${id}`)
  
  return (
    <div className='container_sup2'>
        {recipe ? (
          <div>
      <img src={recipe.imageUrl} alt="img" class="card-img-top"/> 
      <h1 className='lable'>Recipe Name</h1>
      <h2 className='lable'>{recipe.name}</h2>
      <h3 className='lable'>Ingredients:</h3>
      <ul>
        {recipe.ingredients &&
          recipe.ingredients.map((ingredient, index) => (
            <li key={index} className='lable'>{ingredient} </li>
          ))}
      </ul>
      <h3 className='lable'>Instructions:</h3>
      <p className='lable'>{recipe.step}</p></div>
        ) : null }
    </div>
  );
}






