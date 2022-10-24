import { BsArrowRight, BsSearch } from 'react-icons/bs';

import './search-bar.css';

export default function SearchBar({ size }) {
  return (
    <div className={`search-bar-container ${size}`}>
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
