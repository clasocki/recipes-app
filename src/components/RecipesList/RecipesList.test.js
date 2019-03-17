import React from 'react';
import RecipeList from "./RecipesList";
import { render, cleanup, fireEvent } from 'react-testing-library';

describe('Recipe list tests', () => {
    const recipes = [
        {
            id: 0,
            title: 'R1',
            ingredients: ['I1', 'I2']
        },
        {
            id: 1,
            title: 'R2',
            ingredients: ['I3']
        }
    ];

    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(cleanup);

    it('gets recipes when component is mounted and displays them', () => {
        localStorage.setItem('recipes-app', JSON.stringify(recipes));
        const { getByTestId, queryByText } = render(<RecipeList />);
        const recipeList = getByTestId('recipe-list');
        const titleNodes = recipes.map(r => queryByText(r.title));
        
        expect(recipeList.children.length).toBe(2);
        titleNodes.forEach(node => expect(node).not.toBeNull());
    });
    
    it('gets recipes from local storage', () => {
        jest.spyOn(Storage.prototype, 'getItem');
        render(<RecipeList />);

        expect(localStorage.getItem).toBeCalledWith('recipes-app');
    });

    it('shows a modal window when the Add recipe button is clicked', () => {
        const { getByTestId, queryByTestId } = render(<RecipeList />);
        const addRecipeBtn = getByTestId('add-recipe-button');

        expect(queryByTestId('modal-window')).toBeNull();

        fireEvent.click(addRecipeBtn);

        expect(queryByTestId('modal-window')).not.toBeNull();
    });

    it('adds a new recipe when a modal form is submitted', () => {
        const { getByTestId } = render(<RecipeList />);
        const addRecipeBtn = getByTestId('add-recipe-button');
        fireEvent.click(addRecipeBtn);
        const recipeForm = getByTestId('recipe-form');

        fireEvent.submit(recipeForm, {
            target: { 
                ingredients: { 
                    value: 'i1, i2, i3' 
                },
                title: { value: 'Recipe' }
            } 
        });

        const recipeList = getByTestId('recipe-list');
        
        expect(recipeList.children.length).toBe(1);
    });

    it('removes recipe when the Remove button is clicked', () => {
        localStorage.setItem('recipes-app', JSON.stringify(recipes));
        const { getByTestId } = render(<RecipeList />);
        const recipeNode = getByTestId('recipe-item');

        fireEvent.click(recipeNode);
        const deleteBtn = getByTestId('delete-recipe-button');

        const recipeList = getByTestId('recipe-list');
        expect(recipeList.children.length).toBe(2);
        
        fireEvent.click(deleteBtn);
        
        expect(recipeList.children.length).toBe(1);
    });
});

