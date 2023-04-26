import { useMemo } from 'react';

import styles from './sort.module.css';

interface Categories {
  category: string[];
  updateCategory: (test: any) => void;
}
export default function Sort(props: Categories) {
  const sortOrder = ['lunch', 'dinner', 'sides', 'dessert'];

  const sortedItems = useMemo(
    () =>
      props.category.sort((a, b) => {
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
    [props.category]
  );
  return (
    <div className={styles.category_container}>
      <select
        onChange={(e) => {
          props.updateCategory(e.target.value);
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
