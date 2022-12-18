import styles from './sort.module.css';

interface Categories {
  category: string[];
  setType: (test: any) => void;
}
export default function Sort(props: Categories) {
  return (
    <div className={styles.category_container}>
      <select
        onChange={(e) => {
          props.setType(e.target.value);
        }}
        id={styles.category}
        name='category'
      >
        <option value='choose category'>Choose Category</option>
        {props.category.map((item) => {
          return (
            <option value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </option>
          );
        })}
      </select>
    </div>
  );
}
