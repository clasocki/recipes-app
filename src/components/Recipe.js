import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import './Recipe.css';

export default class Recipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: false
        };
    }

    handleRecipeClick = () => {
        this.setState(state => ({ selected: !state.selected }));
    }

    renderIngredients = (ingredients) => {
        return (
            <div className="recipe-details">
                <div className="recipe-ingredients">
                    <div className="recipe-ingredients-title">Ingredients</div>
                    <ul className="recipe-ingredient-list" data-testid="ingredient-list">
                        {ingredients.map(ingredient => (
                            <li key={shortid.generate()} className="recipe-ingredient">{ingredient}</li>
                        ))} 
                    </ul>
                </div>
                <div className="recipe-toolbar">
                    <button className="button red" onClick={this.props.onDelete}>Delete</button>
                    <button className="button blue" onClick={this.props.onEdit}>Edit</button>
                </div>
            </div>
        );
    };

    render() {
        const { title, ingredients } = this.props;

        return (
            <div className="recipe-item">
                <div className="recipe-heading" data-testid="recipe-item" onClick={this.handleRecipeClick}>
                    <div className="recipe-title">
                        {title}
                    </div>
                </div>
                {this.state.selected && this.renderIngredients(ingredients)} 
            </div>
        );
    }
}

Recipe.propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired
};