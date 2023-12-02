import "./App.css";
import { AppHeader } from "./components/app-header/app-header";
import { BurgerIngredients } from "./components/burger-ingredients/burger-ingredients";
import { data } from "./utils/data.js";
import { BurgerConstructor } from "./components/burger-constructor/burger-constructor";
import { useEffect, useState} from "react";
import { getIngredients } from "./contants";

export type Ingredient = (typeof data)[number];

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
  const [allIngredients, setAllIngredient] = useState([])
  useEffect(()=>{ 
    const getData = async () => {
      const res = await fetch (getIngredients);
      const data = await res.json();
      setAllIngredient(data.data)};
      getData();
    }, []);
  return (
    <div className="App">
      <AppHeader />
      <section className="main">
        <BurgerIngredients data={allIngredients} addIngedient={addIngedient} />
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
