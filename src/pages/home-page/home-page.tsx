import { Loading } from "../../components/loading/loadng";
import { useGetAllIngredientQuery } from "../../services/api/api-slice";
import { Error } from "../../components/error/error";
import { AppHeader } from "../../components/app-header/app-header";
import { DndProvider } from "react-dnd";
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "../home-page/home-pages.module.css";

export function HomePage() {
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
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider>
    </div>
  );
}
