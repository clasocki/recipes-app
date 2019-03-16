import React, { Component } from 'react';

export default class RecipeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipe: this.props.initialRecipe
        };
    }

    handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
      
        this.setState({
            recipe: {
                [name]: value
            }
        });
    };

    render() {
        const { onSubmit } = this.props;

        return (
            <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="title">Recipe</label>
                <input className="form-control" id="title" placeholder="Recipe name" 
                       value={this.state.recipe.title} onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
                <label htmlFor="ingredients">Ingredients</label>
                <textarea
                className="form-control"
                id="ingredients"
                placeholder="Enter ingredients separated by commas"
                value={this.state.recipe.ingredients}
                onChange={this.handleInputChange}
                />
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">
                Submit
                </button>
            </div>
            </form>
        );
    }
}
