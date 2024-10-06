import '../css/Header.css';

export default function Header() {

  return (
    <>
      {/* simple header made it like this if I want to add something in the future - Have an idea about shop but i think its way to complicated 04/10/24 1641 */}
      <nav className='nav'>
        <ul className='mainnavbar'>
          <li className='mainnavlink'>
            <a className='title'> Dungeon Slayer </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
