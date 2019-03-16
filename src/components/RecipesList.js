import React, { Component, Fragment } from 'react';
import Recipe from './Recipe';
import { Modal } from './Modal';
import RecipeForm from './RecipeForm';

export default class RecipeList extends Component {
    constructor(props) {
        super(props);

        const recipes = [
            {
                id: 0,
                title: 'Recipe One',
                ingredients: ['ingredient one', 'ingredient two']
            },
            {
                id: 1,
                title: 'Recipe Two',
                ingredients: ['ingredient three', 'ingredient four']
            }
        ]
        const nextId = 2;

        this.state = {
            recipes: recipes,
            isRecipeFormActive: false,
            addOrEditRecipe: undefined,
            editedRecipe: undefined,
            nextId: nextId
        };
    }

    generateNextRecipeId = (recipes) => (Math.min(recipes.map(r => r.id), 0) + 1);

    showModal = () => {
        this.setState({ isRecipeFormActive: true });
    };
    
    closeModal = () => {
        this.setState({ isRecipeFormActive: false });
    };
    
    onSubmitRecipe = (event) => {
        event.preventDefault(event);

        let recipe = {
            title: event.target.title.value,
            ingredients: event.target.ingredients.value.split(",").map(x => x.trim())
        }

        this.setState(state => {
            const recipeId = 
                state.addOrEditRecipe === 'add' 
                    ? this.generateNextRecipeId(state.recipes)
                    : state.editedRecipe.id;

            recipe = {...recipe, ...{ id: recipeId }};
            
            const recipes = state.addOrEditRecipe === 'add'
                ? state.recipes.concat(recipe)
                : state.recipes.map(r => (r.id === recipeId ? recipe : r));

            return { recipes };
        });

        this.closeModal();
    };

    addRecipe = () => {
        this.setState(
            state => ({
                addOrEditRecipe: 'add',
                editedRecipe: {
                    id: undefined,
                    title: undefined,
                    ingredient: undefined
                }
            })
        );

        this.showModal();
    };

    editRecipe = (recipeId) => {
        this.setState(
            state => ({
                addOrEditRecipe: 'edit',
                editedRecipe: state.recipes.find(r => r.id === recipeId)
            })
        );

        this.showModal();
    };

    deleteRecipe = (recipeId) => {
        this.setState(state => ({recipes: state.recipes.filter(r => r.id !== recipeId)}));
    };

    render() {
        return (
            <Fragment>
                <div className="recipe-list">
                    {this.state.recipes.map(recipe =>
                        (<Recipe 
                            key={recipe.id}
                            title={recipe.title}
                            ingredients={recipe.ingredients}
                            onEdit={() => this.editRecipe(recipe.id)}
                            onDelete={() => this.deleteRecipe(recipe.id)} />)
                    )}
                </div>
                <button onClick={this.addRecipe}>Add recipe</button>
                <Modal
                    closeModal={this.closeModal}
                    isOpen={this.state.isRecipeFormActive}>
                        <RecipeForm 
                            initialRecipe={this.state.editedRecipe}
                            onSubmit={this.onSubmitRecipe} />
                </Modal>
            </Fragment>
        );
    }
}