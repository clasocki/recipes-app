import React, { Component } from 'react';
import './App.css';
import RecipeList from './components/RecipesList/RecipesList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RecipeList />
      </div>
    );
  }
}

export default App;
