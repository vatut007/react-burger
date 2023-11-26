import "./App.css";
import { AppHeader } from "./components/app-header/app-header";
import { BurgerIngredients } from "./components/burger-ingredients/burger-ingredints";
import { data } from "./utils/data.js";
import { BurgerConstructor } from "./components/burger-constructor/burger-constructor";
import { useState } from "react";

type Ingredient = (typeof data)[number];

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
  return (
    <div className="App">
      <AppHeader />
      <section className="main">
        <div className="burger-ingredient">
          <BurgerIngredients data={data} addIngedient={addIngedient} />
        </div>
        <div>
          <BurgerConstructor
            selectedIngredients={selectedIngredients}
            selectedBun={selectedBun}
            deleteIngedient={deleteIngedient}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
