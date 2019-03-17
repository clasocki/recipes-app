import React from 'react';
import Recipe from "./Recipe";
import { render, fireEvent, cleanup } from 'react-testing-library';

describe('Recipe tests', () => {
    const recipe = {
        id: 0,
        title: 'R1',
        ingredients: ['I1', 'I2']
    };

    let recipeRenderResult;
    beforeEach(() => {
        recipeRenderResult = render(
            <Recipe 
                key={recipe.id}
                title={recipe.title}
                ingredients={recipe.ingredients}
                onEdit={() => this.editRecipe(recipe.id)}
                onDelete={() => this.deleteRecipe(recipe.id)} />);
    });
    afterEach(cleanup);

    it('renders ingredients when the recipe header is clicked', () => {
        const { getByTestId, queryByText } = recipeRenderResult;
    
        fireEvent.click(getByTestId('recipe-item'));
        const ingredientListNode = getByTestId('ingredient-list');
        const ingredientNodes = recipe.ingredients.map(queryByText);
        
        expect(ingredientListNode.children.length).toBe(2);
        ingredientNodes.forEach(node => expect(node).not.toBeNull());
    });
    
    it('does not display ingredients by default', () => {
        const { queryByText } = recipeRenderResult;
        
        const ingredientNodes = recipe.ingredients.map(queryByText);
        
        ingredientNodes.forEach(node => expect(node).toBeNull());
    });
})
