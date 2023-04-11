import React, { useState } from 'react';

export default function RecipeEditForm(props) {
  const [recipe, setRecipe] = useState(props.recipe);

  const handleChange = (event) => {
    const attributeToChange = event.target.name;
    const newValue = event.target.value;

    const updatedRecipe = { ...recipe };
    updatedRecipe[attributeToChange] = newValue;
    setRecipe(updatedRecipe);
  };

  const handleIngredientChange = (event, index) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = event.target.value;

    const updatedRecipe = { ...recipe, ingredients: newIngredients };
    setRecipe(updatedRecipe);
  };

  const handleDeleteIngredient = (index) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients.splice(index, 1);

    const updatedRecipe = { ...recipe, ingredients: newIngredients };
    setRecipe(updatedRecipe);
  };

  const handleAddIngredient = () => {
    const newIngredients = [...recipe.ingredients, ''];

    const updatedRecipe = { ...recipe, ingredients: newIngredients };
    setRecipe(updatedRecipe);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.editRecipe(recipe);
  };

  return (
    <div>
      <h1>Edit Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" onChange={handleChange} value={recipe.name} />
        </div>

        <div>
          <label>Step</label>
          <input type="text" name="step" onChange={handleChange} value={recipe.step} />
        </div>

        <div>
          <label>Ingredients</label>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                <input type="text" value={ingredient} onChange={(event) => handleIngredientChange(event, index)} />
                <button type="button" onClick={() => handleDeleteIngredient(index)}>Delete</button>
              </li>
            ))}
            <li>
              <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
            </li>
          </ul>
        </div>

        <div>
          <input type="submit" value="Update Recipe" />
        </div>
      </form>
    </div>
  );
}
