import React from 'react'

const RecipeDetails = ({ ingredients }) => {
    return ingredients.map(ingredient => {
        return (
            <div>
                <ul className="ingredient-list">
                    <li className="ingredient-text">{ingredient.text}</li>
                    <li className="ingredient-weight">Weight - {ingredient.weight}</li>
                </ul>
            </div>
        )
    })
}

export default RecipeDetails
