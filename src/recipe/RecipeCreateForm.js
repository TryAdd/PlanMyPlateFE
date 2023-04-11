import React, { useState } from 'react';

export default function RecipeCreateForm(props) {
  const [newRecipe, setNewRecipe] = useState({ name: '', ingredients: [], step: '' });

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
    <div>
      <h1>Create Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" onChange={handleChange} value={newRecipe.name} />
        </div>

        <div>
          <label>Ingredients</label>
          <ul>
            {newRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                <input type="text" value={ingredient} onChange={(event) => handleIngredientChange(event, index)} />
                <button type="button" onClick={() => handleRemoveIngredient(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>
        </div>

        <div>
          <label>Step</label>
          <input type="text" name="step" onChange={handleChange} value={newRecipe.step} />
        </div>
        <div>
          <input type="submit" value="Add Recipe" />
        </div>
      </form>
    </div>
  );
}
