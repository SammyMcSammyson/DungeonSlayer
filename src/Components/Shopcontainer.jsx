import { useState } from 'react';
import '../css/Shopcontainer.css';

export default function ShopContainer({ item, buyItem }) {
  let [isVisible, setIsVisible] = useState(false);
  //setting visbile and non visbile

  function handleClick() {
    //adding to button
    setIsVisible(!isVisible);
  }

  let itemCounter = localStorage.getItem(item.name);

  return (
    <>
      <div className='masterContainer'>
        <p className='shopItemsTitle' onClick={handleClick}>
          {item.name} - {itemCounter}
        </p>
        <div className='shopItemsContainer'>
          {isVisible ? (
            <>
              <p>Description:</p>
              <p className='shopItems'> {item.description}</p>
              <p>Price:</p>
              <p className='shopItems'> {item.price} </p>
              <p>Gold per Second:</p>
              <p className='shopItems'> {item.GpS}</p>
              <button onClick={() => buyItem(item)}>Buy</button>
              {/* the mystry line that makes it all work */}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
