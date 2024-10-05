export function reset() {
  //reset button
  setCounter((counter = 0));
  setCounter1((counter = 0));
  setDonateCounter((donateCounter = 0));
  setGambleCounter((gambleCounter = 0));
  setGpS((GperS = o));
  localStorage.clear();
}

export function loser() {
  //function for losing the game. Alert appears twice i thought this was a problem and started using useEffect and then making new components. In reality it is because I am in Sctict mode in which React runs one extra development-only setup+cleanup cycle.
  if (counter <= -1) {
    alert(
      ' You are in debt.  \n A. Guards from the gambling company appear and break your legs to pay off your debt. \n B. You cry out in pain which awakes the sleeping dragon. \n C. The dragon eats you since you can not run away.'
    );
    reset();
  }
}
