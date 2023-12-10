import "./App.css";
import { AppHeader } from "./components/app-header/app-header";
import { BurgerIngredients } from "./components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "./components/burger-constructor/burger-constructor";
import { useState } from "react";
import { useAllIngredientsApi } from "./utils/burger-api";
import { type Ingredient } from "./types/ingredient";
import { Loading } from "./components/loading/loadng";
import { Error } from "./components/error/error";
import { store } from "./services/store";
import { Provider } from "react-redux";

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    [],
  );
  const [selectedBun, setSelectedBun] = useState<Ingredient | null>(null);
  const addIngedient = (ingredient: Ingredient) => {
    if (ingredient.type === "bun") {
      setSelectedBun(ingredient);
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };
  const [pending, data, error] = useAllIngredientsApi();
  if (pending) {
    return <Loading />;
  }
  if (error) {
    return <Error error={String(error)} />;
  }
  return (
    <div className="App">
      <Provider store={store}>
        <AppHeader />
        <section className="main">
          <BurgerIngredients data={data} addIngedient={addIngedient} />
          <BurgerConstructor />
        </section>
      </Provider>
    </div>
  );
}

export default App;
