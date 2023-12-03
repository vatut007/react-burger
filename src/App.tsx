import "./App.css";
import { AppHeader } from "./components/app-header/app-header";
import { BurgerIngredients } from "./components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "./components/burger-constructor/burger-constructor";
import { useState } from "react";
import { useAllIngredientsApi } from "./utils/burger-api";
import { type Ingredient } from "./types/ingredient";
import { Loading } from "./components/loading/loadng";
import { Error } from "./components/error/error";

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
  const deleteIngedient = (deleteIndex: number) => {
    setSelectedIngredients(
      selectedIngredients.filter((ingredient, index) => index !== deleteIndex),
    );
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
      <AppHeader />
      <section className="main">
        <BurgerIngredients data={data} addIngedient={addIngedient} />
        <BurgerConstructor
          selectedIngredients={selectedIngredients}
          selectedBun={selectedBun}
          deleteIngedient={deleteIngedient}
        />
      </section>
    </div>
  );
}

export default App;
