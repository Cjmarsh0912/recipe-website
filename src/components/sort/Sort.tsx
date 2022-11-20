import styles from './sort.module.css';

interface Categories {
  category: {
    value: string;
    category: string;
  }[];
}
// TODO Add a way to automate the categories
export default function Sort(props: Categories) {
  return (
    <div className={styles.category_container}>
      <select id={styles.category} name='category'>
        <option value='choose category'>Choose Category</option>
        {props.category.map((item) => {
          return <option value={item.value}>{item.category}</option>;
        })}
      </select>
    </div>
  );
}
