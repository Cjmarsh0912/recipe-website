import Posts from '../Posts';

import styles from '../recipes.module.css';

import { RecipeData } from '../../../interfaces/interface';

interface Side_Recipes {
  sideRecipes: RecipeData[];
}

export default function Breakfast(props: Side_Recipes) {
  return (
    <main>
      <header className={styles.test_header}>
        <h3>Side Recipes</h3>
        <div className={styles.search_bar_container}>
          <input
            id='search-bar'
            autoComplete='off'
            spellCheck='false'
            placeholder='Search'
          />
        </div>
      </header>

      <Posts posts={props.sideRecipes} />
    </main>
  );
}
