import Journal from '../../public/Lib/jorunal.json';
import JournalContainer from './Journalcontainer';
import '../css/Journal.css';
import { useState } from 'react';

export default function Journals({ buyJournal, counter }) {
  let [isVisible, setIsVisible] = useState(false);
  function handleClick() {
    //adding to button
    setIsVisible(!isVisible);
  }

  return (
    <div className='masterJournal'>
      <h1 onClick={handleClick} className='JournalTitle'>
        Journal
      </h1>

      {isVisible &&
        Journal.map((shopItems) => (
          <div key={shopItems.ID}>
            <JournalContainer
              Name={shopItems.Name}
              PriceToUnlock={shopItems.PriceToUnlock}
              item={shopItems}
              buyJournal={buyJournal}
              counter={counter}
            />
          </div>
        ))}
    </div>
  );
}
