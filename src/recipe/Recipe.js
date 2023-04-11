import React from 'react'

export default function Recipe(props) {
  return (
    <>
    <td>{props.name}</td>
    <ul>
        {props.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    <td>{props.step}</td>
    <td><button onClick={() => {props.editView(props._id)}}>Edit</button></td>
    <td><button onClick={() => {props.deleteRecipe(props._id)}}>Delete</button></td>

  </>
  )
}
