import { useEffect, useState } from 'react';
import Shop from './Shop';
import Journals from './Journal';
import '../css/Gold.css';
import Guild from './Guild';
import data from '../../public/Lib/data.json';

export default function Gold() {
  let [counter, setCounter] = useState(10000);
  // setting up my global counter variable - changes on reset

  let [counter1, setCounter1] = useState(100);
  //used for my rendering.
  let [counter2, setCounter2] = useState(0);
  //used to make button counter incremnetally increase.
  let [donateCounter, setDonateCounter] = useState(200);
  //setting up global donate variable - changes on reset
  let [gambleCounter, setGambleCounter] = useState(-100);
  //setting up global gamble variable - changes on reset
  let [gambleCounter1, setGambleCounter1] = useState(0);
  //used for rendering
  let [influence, setInfluence] = useState(0);
  //influence counter
  let [showJournal, setShowJournal] = useState(false);
  //variable to check local storage continously not the cleanest way to do this and for bigger apps will cause issues but it works...
  let [unlockGuild, setGuild] = useState(false);
  //variable for shop unlock
  let [GperS, setGpS] = useState(0);
  //setting up global GpS counter
  const [isAnimating, setIsAnimating] = useState(false);
  function load() {
    localStorage.getItem({
      counter,
      donateCounter,
      gambleCounter,
      gambleCounter1,
      GperS,
    });
  }
  load();

  // State to handle animation

  // let purchasedItems = ['Sword', 'Armor ']; //Setting up my array which I will eventually get to load from local storage.

  // let purchasedItems = [];

  // function keyValues() {
  //   let purchasedItems = [];

  //   for (let i = 0; i < localStorage.length; i++) {
  //     let key = localStorage.key(i);

  //     purchasedItems.push({ key: key });
  //   }

  //   return purchasedItems;
  // }
  let [purchasedItems, setPurchasedItems] = useState([]);

  function inStorage() {
    let array = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      array.push(key);
    }
    return array;
  }

  function donateStoreage() {
    if (donateCounter >= 200) {
      localStorage.setItem('Donated 200', 'yes');
    }
  }

  function gambleStorage() {
    if (gambleCounter <= -100) {
      localStorage.setItem('Gamble at least -100', 'yes');
    }
  }

  function GpSStorage() {
    if (GperS >= 15) {
      localStorage.setItem('GPS > 15', 'yes');
    }
  }
  GpSStorage();
  gambleStorage();
  donateStoreage();

  useEffect(() => {
    setPurchasedItems(inStorage());
    console.log(inStorage);
    console.log(purchasedItems);
  }, [counter]); // this is not pretty and is slow but it works and will break if this gets more complicated.

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
  }, []); //in hindsight I should of just done this on Counter in the dependency - C'est la vie.

  useEffect(() => {
    //function to check local storage works pretty much the same as GPS counter
    const interval = setInterval(() => {
      const guildpresent = localStorage.getItem('Adventuers Guild') !== null;
      setGuild(guildpresent);
    }, 1000); // Check every second

    return () => clearInterval(interval); // Clean up on unmount
  }, []); //in hindsight I should of just done this on Counter in the dependency - C'est la vie.

  function reset() {
    //reset button
    setCounter((counter = 0));
    setCounter1((counter = 0));
    setCounter2((counter2 = 0));

    setDonateCounter((donateCounter = 0));
    setGambleCounter((gambleCounter = 0));
    setGambleCounter1((gambleCounter1 = 0));
    setGpS((GperS = 0));
    setInfluence((influence = 0));
    localStorage.clear();
  }
  function save() {
    //save button
    setCounter((counter = counter));
    setCounter1((counter = counter));
    setDonateCounter((donateCounter = donateCounter));
    setGambleCounter((gambleCounter = gambleCounter));
    setGambleCounter1((gambleCounter1 = gambleCounter1));
    setGpS((GperS = GperS));
    localStorage.setItem({
      counter,
      donateCounter,
      gambleCounter,
      gambleCounter1,
      GperS,
    });
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
    setCounter((counter = counter + 1 + counter2));
    setCounter1((counter1 = counter1 + 1));

    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
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
        setGambleCounter1((gambleCounter1 = gambleCounter1 + 1));
      } else {
        setCounter((counter = counter - 7));
        setGambleCounter((gambleCounter = gambleCounter - 7));
        setGambleCounter1((gambleCounter1 = gambleCounter1 + 1));
      }
    }
  }

  const buyItem = (shop) => {
    //this part took me sooooo long but thorugh Chat GPT and copius amounts of googleing it works.
    if (counter >= shop.price) {
      setCounter((prevGold) => prevGold - shop.price);
      console.log(shop.Attack);
      if (shop.Attack === 'No') {
        setGpS((prevGpS) => prevGpS + parseFloat(shop.GpS));
      } else {
        setCounter2(
          (prevCounter) =>
            prevCounter + parseFloat(shop.GoldCollectionMultiplier)
        );
      }
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

  function handleDragonsGuild() {
    if (purchasedItems.includes('winner')) {
      console.log('you win.');
      setCounter((counter = counter + 10000));
      alert(
        'Congrtulations on defeating the Dragon. The princess gives you a reward of 10000 Gold. Maybe you can buy a guild with it...'
      );

      console.log('you win.');
    }
  }

  function buttonsAppear() {
    //if function making butons appear when certain thresholds
    if (counter1 < 10 && gambleCounter1 >= 0) {
      return (
        <>
          <p> Total Gold = {counter} </p>

          {/* <p> Gold Per Second = {GpS} </p>  check variable*/}
          <button
            className={isAnimating ? 'shake' : ''}
            onClick={handleAdditionCounter}
          >
            Collect Gold
          </button>
          {/* <button onClick={GpSCounter}>Gold Per Second</button> check variables */}

          <button onClick={reset}>Reset</button>
        </>
      );
    } else if (counter1 >= 10 && donateCounter <= 50 && gambleCounter1 >= 0) {
      //second part I tried making a cleaner way but this works and is simple even though its messy
      let buttonAlert = localStorage.getItem('donateButton') || '';
      if (buttonAlert != 'yes') {
        alert(
          'As you delve deeper into the dungeon collecting coins a button appears asking to donate to the Troll union'
        );
        localStorage.setItem('donateButton', 'yes');
      }
      console.log(counter1, donateCounter, gambleCounter1);
      return (
        <>
          <p> Total Gold = {counter} </p>
          <p> Gold donated to Troll Union = {donateCounter}</p>

          <button
            className={isAnimating ? 'shake' : ''}
            onClick={handleAdditionCounter}
          >
            Collect Gold
          </button>
          <button onClick={handleSubtractionCounter}>Donate Gold</button>
          <button onClick={reset}>Reset</button>
        </>
      );
    } else if (
      counter1 >= 10 &&
      donateCounter >= 50 &&
      gambleCounter1 >= 0 &&
      gambleCounter1 < 5
    ) {
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

          <button
            className={isAnimating ? 'shake' : ''}
            onClick={handleAdditionCounter}
          >
            Collect Gold
          </button>
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
          'You seem to enjoy Gambling maybe you should spend some of your winnings...'
        );
        localStorage.setItem('GpSButton', 'yes');
      }

      return (
        //returns evverything
        <>
          <p> Total Gold = {counter} </p>
          <p> Gold donated to Troll Union = {donateCounter}</p>
          <p> Gambling Winnings = {gambleCounter}</p>
          <p> Increased Gold from Collection = {counter2}</p>
          <p> Gold Per Second = {GperS}</p>
          <button
            className={isAnimating ? 'shake' : ''}
            onClick={handleAdditionCounter}
          >
            Collect Gold
          </button>
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
                  counter2={counter2}
                  buyJournal={buyJournal}
                  reset={reset}
                  purchasedItems={purchasedItems}
                  handleDragonsGuild={handleDragonsGuild}
                />
              )}
            </div>
            <div className='guildContainer'>{unlockGuild && <Guild />}</div>
          </div>
        </>
      );
    }
  }

  return buttonsAppear();
}
