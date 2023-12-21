import styles from './app.module.css'
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { Loading } from "../loading/loadng";
import { Error } from "../error/error";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useGetAllIngredientQuery } from "../../services/api/api-slice";

function App() {
  const { data, error, isLoading } = useGetAllIngredientQuery(undefined);
  if (isLoading) {
    return <Loading />;
  }
  if (error || !data) {
    return <Error error={String(error)} />;
  }
  return (
    <div className={styles.App}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <BurgerIngredients/>
          <BurgerConstructor />
        </main>
      </DndProvider>
    </div>
  );
}
export default App;
