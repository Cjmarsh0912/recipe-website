import { useMemo, useEffect } from 'react';
import {
  useRecipePageContext,
  useDispatchContext,
} from 'context/RecipePageContext';

import { RecipeData } from 'interfaces/interface';

import styles from './assets/css/sort.module.css';

export default function Sort() {
  const { categories, pageData } = useRecipePageContext();
  const { dispatch } = useDispatchContext();

  const sortOrder = ['lunch', 'dinner', 'sides', 'dessert'];
  const sortedItems = useMemo(
    () =>
      [...categories].sort((a, b) => {
        const indexA = sortOrder.indexOf(a);
        const indexB = sortOrder.indexOf(b);

        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        } else if (indexA !== -1) {
          return -1;
        } else if (indexB !== -1) {
          return 1;
        } else {
          return 0;
        }
      }),
    [categories]
  );

  const sortArray = (category: string, recipeData: RecipeData[]) => {
    const sorted = [...recipeData].filter((item) => {
      if (category === 'choose category') return item;
      if (item.keywords.includes(category)) return true;

      return false;
    });
    dispatch({ type: 'SET_CURRENT_RECIPES', payload: sorted });
  };

  const updateCategories = (recipeData: RecipeData[]) => {
    const newCategories = new Set(recipeData.flatMap((obj) => obj.keywords));
    dispatch({ type: 'SET_CATEGORIES', payload: [...newCategories] });
  };

  function capitalizeFirstLetters(str: string) {
    const words = str.split(' ');
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(' ');
  }

  useEffect(() => {
    updateCategories(pageData);
    sortArray('choose category', pageData);
  }, [pageData]);

  return (
    <div className={styles.category_container}>
      <select
        onChange={(e) => {
          sortArray(e.target.value, pageData);
        }}
        id={styles.category}
        name='category'
      >
        <option value='choose category'>Choose Category</option>
        {sortedItems.map((item, id) => {
          return (
            <option key={id} value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </option>
          );
        })}
      </select>
    </div>
  );
}
