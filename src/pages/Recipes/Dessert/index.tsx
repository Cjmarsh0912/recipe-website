import Posts from '../Posts';

import styles from '../recipes.module.css';

import { RecipeData } from '../../../interfaces/interface';

interface Dessert_Recipes {
  dessertRecipes: RecipeData[];
}

export default function Dessert(props: Dessert_Recipes) {
  return (
    <main>
      <header className={styles.test_header}>
        <h3>Dessert Recipes</h3>
        <div className={styles.search_bar_container}>
          <input
            id='search-bar'
            autoComplete='off'
            spellCheck='false'
            placeholder='Search'
          />
        </div>
      </header>

      <Posts posts={props.dessertRecipes} />
    </main>
  );
}
