import '../css/Intro.css';
import dwarf from '../../public/images/dwarf.jpg';
export default function Intro() {
  return (
    <>
      {/* simple intro not needed but adds flavour to the game which is important in my eyes, have a stretch goal for it to make it appera character by charcter. Uses hooks useEffect and Set Timeout 04/10/24 1642 */}
      <div className='master'>
        <img className='dwarf' src={dwarf}></img>
        <p className='intro'>
          Its really simple, Collect gold, Buy Upgrades and Kill the dragon -
          and there is something about saving a princess.
        </p>
      </div>
    </>
  );
}
