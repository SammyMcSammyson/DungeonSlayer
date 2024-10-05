import '../css/Header.css';

export default function Header() {
  return (
    <>
      {/* simple header made it like this if I want to add something in the future - Have an idea about shop but i think its way to complicated 04/10/24 1641 */}
      <nav className='nav'>
        <ul className='mainnavbar'>
          <li className='mainnavlink'>
            <button className="navButtons"> Shop </button>
            <a className='title'> Dungeon Slayer </a>
            <button className="navButtons"> Journal </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
