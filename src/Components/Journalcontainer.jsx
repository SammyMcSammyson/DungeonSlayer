import { useState } from 'react';
import '../css/Journalcontainer.css';

export default function JournalContainer({ item, buyJournal, counter }) {
  let [isVisible, setIsVisible] = useState(false);
  //setting visbile and non visbile
  let [journalPurchase, setJournalPurchase] = useState(false);
  // was intially trying to do this in the orginal function in the Gold coponent however it obvisoly went wrong. After some googling on StackExcahnge worked out I could just group the functions here.

  function handleClick() {
    //adding to button
    setIsVisible(!isVisible);
  }

  function handleBuy() {
    if (counter < item.PriceToUnlock) {
      alert(
        'You cannot afford this so get on your hands and knees and start collecting Gold you Povo.'
      );
    } else {
      buyJournal(item);
      setJournalPurchase(true);
    }
  }

  return (
    <>
      <div className='masterContainer'>
        <p className='shopItemsTitle' onClick={handleClick}>
          {item.Name}
        </p>
        <div className='shopItemsContainer'>
          {isVisible ? (
            <>
              <p>Name:</p>
              <p className='shopItems'> {item.Name}</p>
              <p>Price to Unlock:</p>
              <p className='shopItems'> {item.PriceToUnlock} </p>
              {journalPurchase ? (
                <p>{item.StoryUnlock}</p>
              ) : (
                <>
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
