import React from 'react'
import { useNavigate } from "react-router-dom";
import RecipeDetails from './RecipeDetails';


export default function Recipe(props) {
  const navigate =useNavigate()


  return (
    
    <div class="card">
    <img class="card-img-top" src={props.imageUrl} alt="img"/>   
    <td class="card-title">{props.name}</td>

    <td><button onClick={() => {props.editView(props._id)}} class="btn btn-outline-warning" id='space'>Edit</button></td>
    <td><button onClick={() => navigate(`/recipe/${props._id}`)} class="btn btn-outline-info" id='space'>View Details</button></td>
    <td><button onClick={() => {props.deleteRecipe(props._id)}}class="btn btn-outline-danger" id='space'>Delete</button></td>
    </div>

  )
}
