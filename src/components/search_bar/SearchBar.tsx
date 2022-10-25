import { BsSearch } from 'react-icons/bs';

import './search-bar.css';

interface SearchBar {
  size?: string;
}
export default function SearchBar(props: SearchBar) {
  return (
    <div className={`search-bar-container ${props.size}`}>
      <input
        id='search-bar'
        autoComplete='off'
        spellCheck='false'
        placeholder='Search'
      />
      <div className='icon-container'>
        <BsSearch className='icon-search' />
      </div>
    </div>
  );
}
