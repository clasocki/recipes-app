import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { RecipeForm } from './RecipeForm';

describe('Recipe form tests', () => {
    afterEach(cleanup);

    const recipe = {
        id: 0,
        title: 'Recipe',
        ingredients: ['i1']
    }

    it('has the Submit button disabled by default for a new recipe', () => {
        const { getByTestId } = render(
            <RecipeForm
                initialRecipe={recipe}
                isNewRecipe={true}
                onSubmit={() => {}} />);
        const submitBtn = getByTestId('submit-recipe-button');

        expect(submitBtn.disabled).toEqual(true);
    });

    it('has the Submit button disabled by default for an existing recipe', () => {
        const { getByTestId } = render(
            <RecipeForm
                initialRecipe={recipe}
                isNewRecipe={false}
                onSubmit={() => {}} />);
        const submitBtn = getByTestId('submit-recipe-button');

        expect(submitBtn.disabled).toEqual(false);
    });

    it('renders an error message when the recipe title becomes empty', () => {
        const { getByTestId, queryByText } = render(
            <RecipeForm
                initialRecipe={recipe}
                isNewRecipe={false}
                onSubmit={() => {}} />);

        fireEvent.change(getByTestId('recipe-title-input'), {target: { value: ''}});

        expect(queryByText('A recipe name cannot be empty')).not.toBe(null);
    });

    it('renders an error message when the ingredient list is empty', () => {
        const { getByTestId, queryByText } = render(
            <RecipeForm
                initialRecipe={recipe}
                isNewRecipe={false}
                onSubmit={() => {}} />);

        fireEvent.change(getByTestId('recipe-ingredients-input'), {target: { value: ''}});

        expect(queryByText('You must provide at least one ingredient')).not.toBe(null);
    });

    it('renders an error message when the ingredient list is improperly formatted', () => {
        const { getByTestId, queryByText } = render(
            <RecipeForm
                initialRecipe={recipe}
                isNewRecipe={false}
                onSubmit={() => {}} />);

        fireEvent.change(getByTestId('recipe-ingredients-input'), {target: { value: ','}});

        expect(queryByText('Ingredient list cannot start with a comma')).not.toBe(null);
    });

    it('renders an error message when the ingredient list has an empty ingredient', () => {
        const { getByTestId, queryByText } = render(
            <RecipeForm
                initialRecipe={recipe}
                isNewRecipe={false}
                onSubmit={() => {}} />);

        fireEvent.change(getByTestId('recipe-ingredients-input'), {target: { value: 'a,'}});

        expect(queryByText('An ingredient name must contain at least one character')).not.toBe(null);
    });
});