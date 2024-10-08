import guild from '../../public/Lib/guild.json';
import Guildcontainer from './Guildcontainer';
import { useState } from 'react';

export default function Guild() {
  let [isVisible, setIsVisible] = useState(false);

  function handleClick() {
    //adding to button
    setIsVisible(!isVisible);
    console.log('guild button Works');
  }

  return (
    <div className='masterJournal'>
      <h1 onClick={handleClick} className='JournalTitle'>
        Adventurers Guild
      </h1>

      {isVisible &&
        guild.map((guildItems) => (
          <div key={guildItems.ID}>
            <Guildcontainer
              Name={guildItems.Story}
              Advice={guildItems.Advice}
              GoldCost={guildItems.GoldCost}
              Description={guildItems.Description}
              item={guildItems}
            />
          </div>
        ))}
    </div>
  );
}
