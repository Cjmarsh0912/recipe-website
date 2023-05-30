import NavbarMobile from './NavbarMobile';
import NavbarFull from './NavbarFull';

import './assets/css/navbar.css';

export default function Navbar() {
  return (
    <>
      <header className='wrapper'>
        <NavbarFull />

        <NavbarMobile />
      </header>
    </>
  );
}
