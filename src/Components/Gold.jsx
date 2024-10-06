import { useEffect, useState } from 'react';
import Shop from './Shop';
import Journals from './Journal';
import '../css/Gold.css';

export default function Gold() {
  let [counter, setCounter] = useState(100);
  // setting up my global counter variable - changes on reset

  let [counter1, setCounter1] = useState(100);
  //used for my rendering.
  let [donateCounter, setDonateCounter] = useState(100);
  //setting up global donate variable - changes on reset
  let [gambleCounter, setGambleCounter] = useState(0);
  //setting up global gamble variable - changes on reset
  let [showJournal, setShowJournal] = useState(false);
  //variable to check local storage continously not the cleanest way to do this and for bigger apps will cause issues but it works...
  let [unlockShop, setUnlockShop] = useState(false);
  //variable for shop unlock
  let [GperS, setGpS] = useState(0);
  //setting up global GpS counter

  useEffect(() => {
    //function that gets GpS working
    const GpSInterval = setInterval(() => {
      setCounter((counter) => counter + GperS);
    }, 1000);
    return () => {
      clearInterval(GpSInterval);
    };
  }, [GperS]);

  useEffect(() => {
    //function to check local storage works pretty much the same as GPS counter
    const interval = setInterval(() => {
      const journalpresent = localStorage.getItem('Journal') !== null;
      setShowJournal(journalpresent);
    }, 1000); // Check every second

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  function reset() {
    //reset button
    setCounter((counter = 0));
    setCounter1((counter = 0));
    setDonateCounter((donateCounter = 0));
    setGambleCounter((gambleCounter = 0));
    localStorage.clear();
  }

  function loser() {
    //function for losing the game. Alert appears twice i thought this was a problem and started using useEffect and then making new components. In reality it is because I am in Sctict mode in which React runs one extra development-only setup+cleanup cycle.
    if (counter <= -1) {
      alert(
        ' You are in debt.  \n A. Guards from the gambling company appear and break your legs to pay off your debt. \n B. You cry out in pain which awakes the sleeping dragon. \n C. The dragon eats you since you can not run away.'
      );
      reset();
    }
  }

  loser(); //calling in my lost function again doesnt need to be in here but I am not confident enough in my ability to place it in a utils file.

  function handleAdditionCounter() {
    // function handling the addition
    setCounter((counter = counter + 1));
    setCounter1((counter1 = counter1 + 1));
  }

  function GpSCounter() {
    // check function to make sure everything works
    setGpS((GpS = GpS + 1));
  }

  function handleSubtractionCounter() {
    // function handling the subtraction
    if (counter <= 0) {
      alert('You have no money to donate you fool.');
    } else {
      setCounter((counter = counter - 1));
      setDonateCounter((donateCounter = donateCounter + 1));
    }
  }

  function handleRandomCounter() {
    // function handling the random counter

    const operators = ['0', '1'];
    let randomOperators = Math.floor(Math.random() * operators.length);
    console.log(randomOperators);
    if (donateCounter < 100) {
      alert('You can not gamble unit you have donated at least 100 gold');
    } else {
      if (randomOperators > 0.5) {
        setCounter((counter = counter + 5));
        setGambleCounter((gambleCounter = gambleCounter + 5));
      } else {
        setCounter((counter = counter - 7));
        setGambleCounter((gambleCounter = gambleCounter - 7));
      }
    }
  }

  const buyItem = (shop) => {
    //this part took me sooooo long but thorugh Chat GPT and copius amounts of googleing it works.
    if (counter >= shop.price) {
      setCounter((prevGold) => prevGold - shop.price);
      setGpS((prevGpS) => prevGpS + parseFloat(shop.GpS));
      //parsefloat is a god send.

      let count = localStorage.getItem(shop.name); //tracking number of items in local storage which then can pull later - not the best way to do this however it is the simpliest to track clicks - I am not a fan of useEffect.
      count = count ? parseInt(count) : 0;
      count += 1;
      localStorage.setItem(shop.name, count);

      let buttonAlert = localStorage.getItem('firstPurchase') || '';
      if (buttonAlert != 'yes') {
        alert(
          'You have bought something. Congratulations on now having a shopping addiction as well as a gambling addiction'
        );
        localStorage.setItem('firstPurchase', 'yes');
      }

      console.log(`Purchased: ${shop.name}`); //checking everything works
    } else {
      console.log(shop.price);
      alert(
        'You are waaay to poor to buy this, have you tried gambling to earn some money?'
      );
    }
  };

  const buyJournal = (shop) => {
    //second time I am doing it, it is alot easier - helps that I actually know what I am doing

    if (counter >= shop.PriceToUnlock) {
      setCounter((prevGold) => prevGold - shop.PriceToUnlock);
      //parsefloat is a god send.

      let count = localStorage.getItem(shop.Name); //Useful to have in Local storage since the game can track where they are in the story
      count = count ? parseInt(count) : 0;
      count += 1;
      localStorage.setItem(shop.Name, count);

      let buttonAlert = localStorage.getItem('firstJournal') || '';
      if (buttonAlert != 'yes') {
        alert(
          'Congratulations you have taken the first steps to saving the princess'
        );
        localStorage.setItem('firstJournal', 'yes');
      }
      console.log(`Purchased: ${shop.Name}`); //checking everything works
    }
  };

  function buttonsAppear() {
    //if function making butons appear when certain thresholds
    if (counter1 < 10 && gambleCounter >= 0) {
      return (
        <>
          <p> Total Gold = {counter} </p>

          {/* <p> Gold Per Second = {GpS} </p>  check variable*/}
          <button onClick={handleAdditionCounter}>Collect Gold</button>
          {/* <button onClick={GpSCounter}>Gold Per Second</button> check variables */}

          <button onClick={reset}>Reset</button>
        </>
      );
    } else if (counter1 >= 10 && donateCounter <= 50 && gambleCounter >= 0) {
      //second part I tried making a cleaner way but this works and is simple even though its messy
      let buttonAlert = localStorage.getItem('donateButton') || '';
      if (buttonAlert != 'yes') {
        alert(
          'As you delve deeper into the dungeon collecting coins a button appears asking to donate to the Troll union'
        );
        localStorage.setItem('donateButton', 'yes');
      }
      return (
        <>
          <p> Total Gold = {counter} </p>
          <p> Gold donated to Troll Union = {donateCounter}</p>

          <button onClick={handleAdditionCounter}>Collect Gold</button>
          <button onClick={handleSubtractionCounter}>Donate Gold</button>
          <button onClick={reset}>Reset</button>
        </>
      );
    } else if (counter1 >= 10 && donateCounter >= 50 && gambleCounter >= 0) {
      //third part it was about here i realiesed I  can use function for repeatingg code but im nearly finished
      let buttonAlert = localStorage.getItem('gamblingButton') || '';
      if (buttonAlert != 'yes') {
        alert(
          'You have donated 50 Gold, you are such a good person. However do you like gambling???'
        );
        localStorage.setItem('gamblingButton', 'yes');
      }

      return (
        <>
          <p> Total Gold = {counter} </p>
          <p> Gold donated to Troll Union = {donateCounter}</p>
          <p> Gambling Winnings = {gambleCounter}</p>

          <button onClick={handleAdditionCounter}>Collect Gold</button>
          <button onClick={handleSubtractionCounter}>Donate Gold</button>
          <button onClick={handleRandomCounter}>Gamble Gold</button>

          <button onClick={reset}>Reset</button>
        </>
      );
    } else {
      //last one  againin is messy and rpeats code but i made it in a way I can easily add more buttons if needed.
      let buttonAlert = localStorage.getItem('GpSButton') || '';
      if (buttonAlert != 'yes') {
        alert(
          'You have lost money gambling have another income stream to help your addiction'
        );
        localStorage.setItem('GpSButton', 'yes');
      }
      return (
        //returns evverything
        <>
          <p> Total Gold = {counter} </p>
          <p> Gold donated to Troll Union = {donateCounter}</p>
          <p> Gambling Winnings = {gambleCounter}</p>
          <p> Gold Per Second = {GperS}</p>
          <button onClick={handleAdditionCounter}>Collect Gold</button>
          <button onClick={handleSubtractionCounter}>Donate Gold</button>
          <button onClick={handleRandomCounter}>Gamble Gold</button>
          <button onClick={reset}>Reset</button>
          <br></br>
          <br></br>
          <div className='componentContainer'>
            <div className='shopContainer'>
              <Shop
                counter={counter}
                donateCounter={donateCounter}
                gambleCounter={gambleCounter}
                GperS={GperS}
                buyItem={buyItem}
              />
            </div>
            <div className='journalContainer'>
              {showJournal && (
                //working out I could do it like this came waaaaay to late and I cba to rewrite all my code however next time I do something like this I will. Also found out about DRY which I will do from now on/
                <Journals
                  counter={counter}
                  donateCounter={donateCounter}
                  gambleCounter={gambleCounter}
                  buyJournal={buyJournal}
                />
              )}
            </div>
          </div>
        </>
      );
    }
  }

  return buttonsAppear();
}
