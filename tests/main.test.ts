import { TicTacToe } from '../src/main';

describe('Inital state', () => {
  it('should add two numbers correctly', () => {
    const game = new TicTacToe();
    expect(game.ticTacToe(2, 3)).toBe(5);
  });
  // it('should ', () => {});
});

/** SOLID things to keep in mind 
  Watch out for the "God Class" (Single Responsibility Principle). (multiple classes)
  Design for tomorrow's rule changes (Open/Closed Principle). (4x4 instead of 3x3)
  Think about who drives the game (Dependency Inversion Principle). (independent core game logic)
*/