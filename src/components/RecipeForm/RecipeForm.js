import React, { Component } from 'react';
import './RecipeForm.css';
import '../../common/stylesheets/styles.css';
import { FormErrors } from '../FormErrors/FormErrors';
import PropTypes from 'prop-types';

export class RecipeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipe: this.props.initialRecipe,
            formErrors: { title: '', ingredients: '' },
            titleValid: !this.props.isNewRecipe,
            ingredientsValid: !this.props.isNewRecipe,
            formValid: !this.props.isNewRecipe
        };
    }

    handleInputChange = (event) => {
        const name = event.target.id;
        const value = event.target.value;

        this.setState(
            state => ({
                recipe: {
                    ...state.recipe,
                    [name]: value
                }
            }),
            () => { this.validateField(name, value) });
    };

    validateField(fieldName, value) {
        let formErrors = this.state.formErrors;
        let titleValid = this.state.titleValid;
        let ingredientsValid = this.state.ingredientsValid;

        switch (fieldName) {
            case 'title':
                titleValid = value.length > 0;
                formErrors.title = titleValid ? '' : 'A recipe name cannot be empty';
                break;
            case 'ingredients':
                formErrors.ingredients = '';
                ingredientsValid = value.length > 0;
                if (!ingredientsValid) {
                    formErrors.ingredients = 'You must provide at least one ingredient';
                    break;
                }
                ingredientsValid = ingredientsValid && !value.startsWith(',');
                if (!ingredientsValid) {
                    formErrors.ingredients = 'Ingredient list cannot start with a comma';
                    break;
                }
                ingredientsValid = ingredientsValid && value.split(',').map(x => x.trim()).every(i => i.length > 0);
                if (!ingredientsValid) {
                    formErrors.ingredients = 'An ingredient name must contain at least one character';
                    break;
                }
                break;
            default:
                break;
        }
        this.setState({
            formErrors,
            titleValid,
            ingredientsValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.titleValid && this.state.ingredientsValid });
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }

    render() {
        const { onSubmit } = this.props;

        return (
            <div className="form-panel">
                <FormErrors formErrors={this.state.formErrors} />
                <form className="recipe-form" onSubmit={onSubmit} data-testid="recipe-form">
                    <div className="form-group">
                        <label htmlFor="title">Recipe</label>
                        <input type="text" 
                               className={`form-control ${this.errorClass(this.state.formErrors.title)}`} 
                               id="title" placeholder="Recipe name"
                               value={this.state.recipe.title} onChange={this.handleInputChange} 
                               data-testid="recipe-title-input"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="ingredients">Ingredients</label>
                        <textarea
                            className={`form-control ${this.errorClass(this.state.formErrors.ingredients)}`}
                            id="ingredients"
                            placeholder="Enter ingredients separated by commas"
                            value={this.state.recipe.ingredients}
                            onChange={this.handleInputChange}
                            data-testid="recipe-ingredients-input" />
                    </div>
                    <div className="form-group">
                        <button className="form-control button green" type="submit" 
                                disabled={!this.state.formValid} data-testid="submit-recipe-button">
                            Submit
                        </button>
                    </div>
                </form>
            </div>

        );
    }
}

export default RecipeForm;

RecipeForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isNewRecipe: PropTypes.bool.isRequired,
    initialRecipe: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string.isRequired,
        ingredients: PropTypes.arrayOf(PropTypes.string).isRequired
    })
};
