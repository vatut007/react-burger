import './App.css';
import { AppHeader } from './components/app-header/app-header';
import { BurgerIngredients } from './components/burger-ingredients/burger-ingredints';
import {data} from './utils/data.js';
import {BurgerConstructor} from './components/burger-constructor/burger-constructor';


function App() {
  return (
    <div className="App">
      <AppHeader />
      <section className='main'>
        <div className='burger-ingredient'>
        <BurgerIngredients data={data}/>
        </div>
        <div>
          <BurgerConstructor/>
        </div>
      </section>
    </div>
  );
}

export default App;
