import Posts from '../../components/posts/Posts';

import styles from '../../pages/Recipes/recipes.module.css';

import { RecipeData } from '../../interfaces/interface';

import Sort from '../../components/sort/Sort';

interface Quick_Recipes {
  quickRecipes: RecipeData[];
}

export default function Quick(props: Quick_Recipes) {
  const categories = [
    {
      value: 'noodles',
      category: 'Noodles',
    },
    {
      value: 'meat',
      category: 'Meat',
    },
    {
      value: 'no meat',
      category: 'No Meat',
    },
  ];
  return (
    <main>
      <header className={styles.test_header}>
        <h3>30 Minutes or less</h3>
        <Sort category={categories} />
      </header>

      <Posts posts={props.quickRecipes} />
    </main>
  );
}
