import { useState, ChangeEvent } from 'react';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import styles from '../navbar/navbar.module.css';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  function HandleSearch(): void {}
  return (
    <div className={styles.search_bar}>
      <div
        className={`${styles.search_bar_container} ${
          isExpanded ? styles.expanded : ''
        }`}
      >
        <button
          className={styles.search_button}
          type='button'
          onClick={HandleSearch}
        >
          <AiOutlineSearch />
        </button>
        <input
          type='search'
          placeholder='Search for recipes here ex: beef'
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchInput(e.target.value)
          }
          value={searchInput}
        />
        <button
          className={styles.close_button}
          type='button'
          onClick={() => setIsExpanded(false)}
        >
          <AiOutlineClose />
        </button>
      </div>
      <button
        className={styles.search_icon}
        type='button'
        onClick={() => setIsExpanded(true)}
      >
        <AiOutlineSearch />
      </button>
    </div>
  );
}
