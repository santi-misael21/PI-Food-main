import './App.css';
import React from 'react';
import {Route, BrowserRouter as Router/*, Switch*/} from "react-router-dom";

import ReduxState from './components/--1-BajoSubsuelo';
// import Paginador from './components/0-Paginador';
// import Search from './components/-1-Search';
import Inicial from './components/1-Inicial.jsx';
// import Pages from './components/1-Pages';
// import AllRecipes from './components/2-Recipes.jsx';
// import Recipe from './components/3-Recipe.jsx';
import RecipeDetail from './components/4-RecipeDetail';
import Diets from './components/5-Diets.jsx';
// import Diet from './components/6-Diet';
import Form from './components/7-Form.jsx';
import Creado from './components/15-Redux';

import Tabla from './components/20-Tablas';

function App() {

  return (
  <div className="App">
    <Router>
      <Route exact path='/' render={()=> <Inicial/> }/>
      <Route exact path='/recipes' component={ReduxState}/>
      <Route path='/diets' component={Diets}/>
      <Route path={`/recipes/:id`} component={RecipeDetail}/>
      <Route path='/create' component={Form}/>
      <Route path='/creadas' component={Creado}/>

      <Route path='/table' component={Tabla}/>
    </Router>
  </div>
  );
}

export default App;
