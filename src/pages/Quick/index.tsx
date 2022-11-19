import Posts from '../../components/posts/Posts';

import styles from '../../pages/Recipes/recipes.module.css';

import { RecipeData } from '../../interfaces/interface';

import SearchBar from '../Recipes/SearchBar';

interface Quick_Recipes {
  quickRecipes: RecipeData[];
}

export default function Quick(props: Quick_Recipes) {
  return (
    <main>
      <header className={styles.test_header}>
        <h3>30 Minutes or less</h3>
        <SearchBar />
      </header>

      <Posts posts={props.quickRecipes} />
    </main>
  );
}
