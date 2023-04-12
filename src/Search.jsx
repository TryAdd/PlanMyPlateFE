import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import RecipeList from './recipe/RecipeList'


export default function Search(props) {
    const [query, setQuery] = useState("")
  return (
    <div>
        <input type='text' placeholder='Search..' className='search' onChange={(e)=> setQuery(e.target.value)}></input>
        <ul>
            {props.name}
        </ul>
        <RecipeList/>
     </div>
     )
     
}
