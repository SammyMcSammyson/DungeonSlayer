import '../css/Intro.css';
import dwarf from '../../public/images/Dwarf.png';

export default function Intro() {
  return (
    <div className='master'>
      <img className='dwarf' src={dwarf}></img>
      <p className='paragraph'>
        You are a questing Adventuer who has just entered a dungeon. You have
        done this a million times and this is no different. Slay the Dragon,
        Save the Princess. Collect Gold, Upgrade your Gear and go Fight.
      </p>
    </div>
  );
}

{
  /* simple intro not needed but adds flavour to the game which is important in my eyes, have a stretch goal for it to make it appera character by charcter. Uses hooks useEffect and Set Timeout 04/10/24 1642 */
}
