'use strict';

//HERE LIVES YOUR TEST
const log = jest.spyOn(global.console, 'log').mockImplementation(() => {})

let index = require('../index.js');
let RNG = index.randomNumGenerator;
let CG = index.checkGuess;
let WM = index.welcomeMessage;
let SM = index.socketMessage;

describe('App Template testing', () => {
  it('The random number generator creates a number', () => {
    let test = RNG();
    expect(test).toEqual(expect.any(Number));
    expect(test < 10).toBeTruthy();
    expect(test > -1).toBeTruthy();
  });
  it('Our guess checker works properly', () => {
    let truthyStatement = 'YOU GUESSED MY NUMBER';

    let test = CG(3,3);
    expect(test).toEqual(truthyStatement);
  });
  it('Our guess checker will return falsey statement if the guess is not the same', () => {
    let falseyStatement = 'You did not guess my number';

    let test = CG(3,2);
    expect(test).toEqual(falseyStatement);
  });
  it('Log testing',() => {
    WM(1);
    expect(log).toHaveBeenCalled();
  });
  it('Should return the appropriate connection message', ()=>{
  expect(SM(1)).toEqual('Hello there 1 from template server. This is a number guessing game. Guess a number between 1-9');
  })
});
