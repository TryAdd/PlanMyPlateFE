import React from 'react'

export default function Recipe(props) {
  return (
    <>
    <td>{props.name}</td>
    <td>{props.ingredient}</td>
    <td>{props.step}</td>
    <td><button onClick={() => {props.editView(props._id)}}>Edit</button></td>
    <td><button onClick={() => {props.deleteRecipe(props._id)}}>Delete</button></td>

  </>
  )
}
