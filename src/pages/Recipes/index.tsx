import Posts from './Posts';

import { RecipeData } from '../../interfaces/interface';

import styles from './recipes.module.css';

interface AllRecipes {
  recipes: RecipeData[];
}

export default function Recipes(props: AllRecipes) {
  return (
    <main>
      <header className={styles.test_header}>
        <h3>All recipes</h3>
        <div className={styles.search_bar_container}>
          <input
            id='search-bar'
            autoComplete='off'
            spellCheck='false'
            placeholder='Search'
          />
        </div>
        {/* <SearchBar /> */}
      </header>

      <Posts posts={props.recipes} />
    </main>
  );
}
