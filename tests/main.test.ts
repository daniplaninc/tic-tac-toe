import { TicTacToe } from '../src/main';

describe('Inital state', () => {
  it('should add two numbers correctly', () => {
    const game = new TicTacToe();
    expect(game.ticTacToe(2, 3)).toBe(5);
  });
  // it('should ', () => {});
});