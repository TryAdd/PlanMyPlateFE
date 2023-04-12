import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

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
    <div>
        
      <h1>Recipe Name</h1>
      <h2>{recipe.name}</h2>
      <h3>Ingredients:</h3>
      <img src={recipe.imageUrl} alt="img"/> 
      <ul>
        {recipe.ingredients &&
          recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{recipe.step}</p>
    </div>
  );
}






