import React from 'react'
import { useNavigate } from "react-router-dom";
import RecipeDetails from './RecipeDetails';


export default function Recipe(props) {
  const navigate =useNavigate()


  return (
    
    <>
    
    <td>{props.name}</td>
    <img src={props.imageUrl} alt="img"/>   
    <td><button onClick={() => {props.editView(props._id)}}>Edit</button></td>
    <td><button onClick={() => {props.deleteRecipe(props._id)}}>Delete</button></td>
    <button onClick={() => navigate(`/recipe/${props._id}`)}>View Details</button>
    

    </>
  )
}
