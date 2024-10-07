import Journal from '../../public/Lib/jorunal.json';
import JournalContainer from './Journalcontainer';
import '../css/Journal.css';
import { useState } from 'react';

export default function Journals({
  buyJournal,
  counter,
  reset,
  purchasedItems,
  handleDragonsGuild,
}) {
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
        Journal.map((shopItems, index) => (
          <div key={shopItems.ID}>
            <JournalContainer
              Name={shopItems.Name}
              Advice={shopItems.Advice}
              PriceToUnlock={shopItems.PriceToUnlock}
              item={shopItems}
              ConditionToNotDie={shopItems.ConditionToNotDie}
              buyJournal={buyJournal}
              DeathMessage={shopItems.DeathMessage}
              counter={counter}
              reset={reset}
              purchasedItems={purchasedItems}
              index={index}
              handleDragonsGuild={handleDragonsGuild}
            />
          </div>
        ))}
    </div>
  );
}
