import { useMemo } from 'react';
import { useStateContext } from 'context/RecipeContext';

import styles from './assets/css/sort.module.css';

interface Categories {
  updateCategory: (category: string) => void;
}
export default function Sort({ updateCategory }: Categories) {
  const { categories } = useStateContext();

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
  return (
    <div className={styles.category_container}>
      <select
        onChange={(e) => {
          updateCategory(e.target.value);
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
