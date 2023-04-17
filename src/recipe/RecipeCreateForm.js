import React, { useState } from 'react';
import axios from "axios";
import { Container, Form, Button } from 'react-bootstrap'


export default function RecipeCreateForm(props) {
  const [newRecipe, setNewRecipe] = useState({ name: '', ingredients: [], step: '' });
  
  //Image file upload :
   const [file, setFile] = useState([])
  const [fileSelected, setFileSelected] = useState("")
  const [loading, setLoading] = useState(false)
 
  // eslint-disable-next-line
  const [res, setRes] = useState({})
  const handleSelectFile = (e) => {
    file.length = 0
    setFileSelected("")
    if (e.target.files.length === 1) {
      file.push(e.target.files[0])
      setFile(file)
    
      // setFileSelected("1")
      setFileSelected(<center>{file[0].name}</center>)
    }
    else {
      for (let i = 0; i < e.target.files.length; i++) {
        file.push(e.target.files[i])
        setFile(file)
        setFileSelected(<center>Multiple Files Selected</center>)
      }
    }
  }

  const handleUpload = async (e) => {
    try {
      setLoading(true);
      const data = new FormData()

      for (let i = 0; i < file.length; i++) {
        data.append("my_file", file[i])
      }

      const res = await axios.post(`/image/upload?id=${props.currentID}`, data)
      setRes(res.data)

      if (file.length > 0) {
        alert("You Uploaded Something B)")
      }
      else if (file.length < 1) {
        alert("Please Select Your Files :(")
      }
      setFileSelected("")
    }
    catch (error) {
      alert(error.message)
    }
    finally {
      setLoading(false)
    }}
  

 
    const handleChange = (event) => {
    const attributeToChange = event.target.name;
    const newValue = event.target.value;

    let recipe = { ...newRecipe };
    if (attributeToChange === 'ingredients') {
      // Split the input value into an array
      const ingredientsArray = newValue.split(/[\n,]+/);
      recipe = {
        ...recipe,
        ingredients: ingredientsArray,
      };
    } else {
      recipe[attributeToChange] = newValue;
    }

    console.log(recipe);
    setNewRecipe(recipe);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addRecipe(newRecipe);
    setNewRecipe({ name: '', ingredients: [], step: '' });
  };

  const handleIngredientChange = (event, index) => {
    const newIngredients = [...newRecipe.ingredients];
    newIngredients[index] = event.target.value;

    const updatedRecipe = { ...newRecipe, ingredients: newIngredients };
    setNewRecipe(updatedRecipe);
  };

  const handleAddIngredient = () => {
    const updatedRecipe = { ...newRecipe, ingredients: [...newRecipe.ingredients, ''] };
    setNewRecipe(updatedRecipe);
  };

  const handleRemoveIngredient = (index) => {
    const updatedRecipe = { ...newRecipe };
    updatedRecipe.ingredients.splice(index, 1);
    setNewRecipe(updatedRecipe);
  };

  return (
    <div className='container_sup2'>
      <h1 id='Title'>Create Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className='container'>
          <label> <span className='lable'>Name</span></label>
          <input type="text" name="name" onChange={handleChange} value={newRecipe.name} />
        </div>

        <div className='container'>
          <label> <span className='lable'>Ingredients</span></label>
          <ul>
            {newRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                <input type="text" value={ingredient} onChange={(event) => handleIngredientChange(event, index)} />
                <button type="button" onClick={() => handleRemoveIngredient(index)} >
                <span className='lable'>Remove</span>
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>
        </div>

        <div className='container'>
          <label> <span className='lable'>Step</span></label>
          <input type="text" name="step" onChange={handleChange} value={newRecipe.step} />
        
        </div>
        <div className="App">
      <h1> <span className='lable'>Upload Recipe image</span></h1>
      
        <label htmlFor="file" className="btn-grey">
          {" "}
          select files
        </label>

        {fileSelected}

        <input
          id="file"
          type="file"
          onChange={handleSelectFile}
          multiple={true}
        />

        {fileSelected && (
          <>
            <button onClick={handleUpload} className="btn-green" variant="dark" id="square" >
              {loading ? "uploading..." : "upload to cloudinary and MongoDB"}
            </button>
          </>
        )}
    </div >

     <input type="submit" value="Add Recipe"  />
      </form>

     

    </div>

    
  );
}
