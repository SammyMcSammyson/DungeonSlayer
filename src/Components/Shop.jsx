import data from '../../public/Lib/data.json';
import { useState } from 'react';
import ShopContainer from './Shopcontainer';
import '../css/Shop.css';

export default function Shop({ buyItem }) {
  //I did it like this since this was the way manny did it and it also allows me to individually click the shop per item rather than dealing with 1 boolean and trying to get that to change - hindsight that would of been easier than dooing this whole GrandParent - parent - child component thing. However I am now super comfortable sending things up and down components and decent at debugging and parameters.
  return (
    <>
      <h1 className='shopTitle'>SHOP</h1>

      {data.map((shopItems) => (
        <div key={shopItems.id}>
          <ShopContainer
            name={shopItems.name}
            description={shopItems.description}
            price={shopItems.price}
            GpS={shopItems.GpS}
            BUY={shopItems.BUY}
            item={shopItems} //This was the missing link and took me about 3 hrs and some chatGPT help to figure out what was missing so simple yet so hard.
            buyItem={buyItem}
          />
        </div>
      ))}
    </>
  );
}
