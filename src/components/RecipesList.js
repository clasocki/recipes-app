import React, { Component, Fragment } from 'react';
import Recipe from './Recipe';
import { Modal } from './Modal';
import RecipeForm from './RecipeForm';
import './RecipesList.css';

export class RecipeList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: [],
            isRecipeFormActive: false,
            addOrEditRecipe: undefined,
            editedRecipe: undefined,
            nextId: 0
        };
    }

    componentDidMount() {
        const recipesJson = this.loadRecipes();

        if (recipesJson) {
            this.setState({
                recipes: JSON.parse(recipesJson)
            });
        }
    }

    loadRecipes() {
        return window.localStorage.getItem("recipes-app");
    }

    saveRecipes(recipes) {
        localStorage.setItem("recipes-app", JSON.stringify(recipes));
    }

    generateNextRecipeId = (recipes) => {
        if (!recipes) return 0;

        const ids = recipes.map(r => r.id).sort();

        if (ids[0] !== 0) return 0;

        let i = 0;
        while (i + 1 < recipes.length) {
            if (ids[i + 1] - ids[i] > 1) return ids[i] + 1;
            i++;
        }

        return ids[i] + 1;
    };

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

        this.setState(
            state => {
                const recipeId = 
                    state.addOrEditRecipe === 'add' 
                        ? this.generateNextRecipeId(state.recipes)
                        : state.editedRecipe.id;

                recipe = {...recipe, ...{ id: recipeId }};
                
                const recipes = state.addOrEditRecipe === 'add'
                    ? state.recipes.concat(recipe)
                    : state.recipes.map(r => (r.id === recipeId ? recipe : r));

                return { recipes };
            },
            () => {
                this.saveRecipes(this.state.recipes);
            }
        );

        this.closeModal();
    };

    addRecipe = () => {
        this.setState(
            state => ({
                addOrEditRecipe: 'add',
                editedRecipe: {
                    id: undefined,
                    title: '',
                    ingredients: []
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
        this.setState(
            state => ({recipes: state.recipes.filter(r => r.id !== recipeId)}),
            () => {
                this.saveRecipes(this.state.recipes);
            });
    };

    render() {
        return (
            <Fragment>
                <div className="recipe-list" data-testid="recipe-list">
                    {this.state.recipes.map(recipe =>
                        (<Recipe 
                            key={recipe.id}
                            title={recipe.title}
                            ingredients={recipe.ingredients}
                            onEdit={() => this.editRecipe(recipe.id)}
                            onDelete={() => this.deleteRecipe(recipe.id)} />)
                    )}
                </div>
                <div className="recipe-list-toolbar">
                    <button className="button blue" onClick={this.addRecipe} 
                            data-testid="add-recipe-button">Add recipe</button>
                </div>
                <Modal
                    title={this.state.addOrEditRecipe === 'add' ? 'Add recipe' : 'Edit recipe'}
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

export default RecipeList;