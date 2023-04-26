import { useEffect, useState } from 'react';

import Posts from '../../components/posts/Posts';

import { RecipeData } from '../../interfaces/interface';
import Sort from '../../components/sort/Sort';

import styles from './recipes.module.css';

type RecipesPageProps = {
  name: string;
  addToBookmarks: (id: number) => void;
  removeFromBookmarks: (id: number) => void;
  bookmarks: number[];
  categories: string[];
  updateCategories: (recipes: RecipeData[]) => void;
  updateCurrentRecipes: (data: RecipeData[]) => void;
  sortArray: (type: string, data: RecipeData[]) => void;
  currentRecipes: RecipeData[];
  recipes: RecipeData[];
};

export default function RecipesPage({
  name,
  addToBookmarks,
  removeFromBookmarks,
  bookmarks,
  categories,
  updateCategories,
  updateCurrentRecipes,
  sortArray,
  currentRecipes,
  recipes,
}: RecipesPageProps) {
  const [category, setCategory] = useState<string>('choose category');

  const updateCategory = (data: string) => {
    setCategory(data);
  };

  useEffect(() => {
    updateCategories(recipes);
    updateCurrentRecipes(recipes);
  }, [recipes]);

  useEffect(() => {
    sortArray(category, recipes);
  }, [category]);

  return (
    <main>
      <header className={styles.test_header}>
        <h3>{name}</h3>
        <Sort updateCategory={updateCategory} category={categories} />
      </header>

      <Posts
        addToFavorite={addToBookmarks}
        removeFromFavorite={removeFromBookmarks}
        bookmarked={bookmarks}
        posts={currentRecipes}
      />
    </main>
  );
}
