import { useState } from 'react';
import '../css/Journalcontainer.css';

export default function GuildContainer({ item }) {
  let [isVisible, setIsVisible] = useState(false);
  //setting visbile and non visbile

  const [itemColour, setItemColour] = useState('lightgrey'); // New state for background color
  let [guildPurchase, setGuildPurchase] = useState(false);

  function handleBuy() {
    if (counter < item.GoldCost) {
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
      setGuildPurchase(true);
      setItemColour('lightgreen'); // Change color to indicate it's unlocked
    }
  }

  function handleClick() {
    console.log('guild button Works');
    //adding to button
    setIsVisible(!isVisible);
  }

  return (
    <>
      <div className='masterContainer'>
        <p
          className='shopItemsTitle'
          style={{ backgroundColor: itemColour }}
          onClick={handleClick}
        >
          {item.Story}
        </p>

        <div className='shopItemsContainer'>
          {isVisible ? (
            <>
              {guildPurchase ? (
                <>
                  <p>{item.Description}</p>
                </>
              ) : (
                <>
                  <p>Advice</p>
                  <p>{item.Advice}</p>
                  <p>Price to Unlock:</p>
                  <p className='shopItems'> {item.GoldCost} </p>
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
