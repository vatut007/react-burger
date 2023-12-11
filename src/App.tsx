import "./App.css";
import { AppHeader } from "./components/app-header/app-header";
import { BurgerIngredients } from "./components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "./components/burger-constructor/burger-constructor";
import { Loading } from "./components/loading/loadng";
import { Error } from "./components/error/error";

import { useGetAllIngredientQuery } from "./services/api/api-slice";

function App() {
  const { data, error, isLoading } = useGetAllIngredientQuery(undefined);
  if (isLoading) {
    return <Loading />;
  }
  if (error || !data) {
    return <Error error={String(error)} />;
  }
  return (
    <div className="App">
      <AppHeader />
      <section className="main">
        <BurgerIngredients data={data} />
        <BurgerConstructor />
      </section>
    </div>
  );
}
export default App;
