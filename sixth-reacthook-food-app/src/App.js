import React, { useState } from 'react';
import Recipe from './components//Recipe'
import axios from 'axios'
import './App.css';

function App() {
const [query, setQuery] = useState('')
const [recipes, setRecipes] = useState([])
const [alert, setAlert] = useState('')
const api= {
  id: '206aacfc',
  key: '5d2e629c1ba708080c2383abb6794110',
}
const url = `https://api.edamam.com/search?q=${query}&app_id=${api.id}&app_key=${api.key}`

const getData = async () => {
    const result = await axios.get(url)
    setRecipes(result.data.hits)
    setQuery('')
}
const onSubmit = e => {
  e.preventDefault();
  getData()
}
  return (
    <div className="App">
      <h1>Food Recipes</h1>
      <form className="search-form" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="search food..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <input type="submit" value="SEARCH"/>
      </form>
      <div className="recipes">
      {
        recipes !== [] && recipes.map(recipe => {
          return (
            <div>
              <Recipe recipe={recipe}/>
            </div>
          )
        })
      }
      </div>
    </div>
  );
}

export default App;
