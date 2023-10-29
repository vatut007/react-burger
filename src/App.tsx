import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AppHeader } from './components/app-header/app-header';
import { BurgerIngredients } from './components/burger-ingredients/burger-ingredints';
import {data} from './utils/data.js'

function App() {
  return (
    <div className="App">
      <AppHeader />
      <BurgerIngredients data={data}/>
    </div>
  );
}

export default App;
