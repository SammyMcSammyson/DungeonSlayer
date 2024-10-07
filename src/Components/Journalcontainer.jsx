import { useState } from 'react';
import '../css/Journalcontainer.css';
import Journal from '../../public/Lib/jorunal.json';

export default function JournalContainer({
  item,
  buyJournal,
  counter,
  reset,
  purchasedItems,
  index,
  handleDragonsGuild,
}) {
  let [isVisible, setIsVisible] = useState(false);
  //setting visbile and non visbile
  let [journalPurchase, setJournalPurchase] = useState(false);
  // was intially trying to do this in the orginal function in the Gold coponent however it obvisoly went wrong. After some googling on StackExcahnge worked out I could just group the functions here.
  const [itemColour, setItemColour] = useState('lightgrey'); // New state for background color

  function handleClick() {
    //adding to button
    setIsVisible(!isVisible);
  }

  function handleBuy() {
    if (counter < item.PriceToUnlock) {
      alert(
        'You cannot afford this so get on your hands and knees and start collecting Gold you Povo.'
      );
    } else if (
      item.ConditionToNotDie !== 'N/A' &&
      !purchasedItems.includes(item.ConditionToNotDie) //through some googling i worked out it was the fact the array is complex so trying a few things. I think Map is the way to go but i want to try something simplier in the intial purchase function. the simple option worked. I have a fully functiontioning clicker.
    ) {
      // Check if the required item is not owned by the player
      alert(`${item.DeathMessage}`);
      reset();
    } else {
      buyJournal(item);
      setJournalPurchase(true);
      setItemColour('lightgreen'); // Change color to indicate it's unlocked
      setIndex;
      console.log(index);
      handleDragonsGuild(index);
    }
  }

  function setIndex() {
    if (index === 19) {
      localStorage.setItem('winner", "Yes');
    }
  }

  return (
    <>
      <div className='masterContainer'>
        <p
          className='shopItemsTitle'
          style={{ backgroundColor: itemColour }}
          onClick={handleClick}
        >
          {item.Name}
        </p>

        <div className='shopItemsContainer'>
          {isVisible ? (
            <>
              {journalPurchase ? (
                <>
                  <p>{item.StoryUnlock}</p>
                </>
              ) : (
                <>
                  <p>Advice</p>
                  <p>{item.Advice}</p>
                  <p>Price to Unlock:</p>
                  <p className='shopItems'> {item.PriceToUnlock} </p>
                  <button onClick={handleBuy}>Unlock</button>
                </>
              )}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
