import styles from './recipes.module.css';

export default function SearchBar() {
  return (
    <div className={styles.search_bar_container}>
      <input
        id={styles.search_bar}
        autoComplete='off'
        spellCheck='false'
        placeholder='Search'
      />
    </div>
  );
}
