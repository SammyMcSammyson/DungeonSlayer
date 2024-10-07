import data from '../../public/Lib/data.json';
import ShopContainer from './Shopcontainer';
import '../css/Shop.css';
import { useState } from 'react';

export default function Shop({ buyItem }) {
  //I did it like this since this was the way manny did it and it also allows me to individually click the shop per item rather than dealing with 1 boolean and trying to get that to change - hindsight that would of been easier than dooing this whole GrandParent - parent - child component thing. However I am now super comfortable sending things up and down components and decent at debugging and parameters.

  let [isVisible, setIsVisible] = useState(false);
  function handleClick() {
    //adding to button
    setIsVisible(!isVisible);
  }
  //note to self make this in utils next time since im using it everywhere

  return (
    <>
      <h1 className='shopTitle' onClick={handleClick}>
        SHOP
      </h1>
      {isVisible &&
        data.map((shopItems) => (
          <div key={shopItems.id}>
            <ShopContainer
              name={shopItems.name}
              description={shopItems.description}
              price={shopItems.price}
              GpS={shopItems.GpS}
              BUY={shopItems.BUY}
              item={shopItems}
              Gold
              Collection
              GoldCollectionMultiplier={shopItems.GoldCollectionMultiplier}
              Attack={shopItems.attack}
              unknown={shopItems.unknown}
              buyItem={buyItem}
            />
          </div>
        ))}
    </>
  );
}
