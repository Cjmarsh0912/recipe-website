import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import Posts from '../../components/posts/Posts';

import { RecipeData, PageData } from '../../interfaces/interface';
import Sort from '../../components/sort/Sort';

import styles from './recipes.module.css';

export default function Recipes(props: PageData) {
  const [type, setType] = useState('choose category');
  const location = useLocation();

  const updateType = (data: any) => {
    setType(data);
  };

  useEffect(() => {
    props.updateCategories(props.recipes);
    props.updateCurrentData(props.recipes);
  }, [location]);

  useEffect(() => {
    props.sortArray(type, props.recipes);
  }, [type]);

  return (
    <main>
      <header className={styles.test_header}>
        <h3>{props.name}</h3>
        <Sort setType={updateType} category={props.categories} />
      </header>

      <Posts
        addToFavorite={props.addToFavorites}
        removeFromFavorite={props.removeFromFavorites}
        bookmarked={props.favorites}
        posts={props.currentData}
      />
    </main>
  );
}
