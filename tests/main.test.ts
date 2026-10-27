import { TicTacToe, Board } from '../src/main';


describe('TicTacToe Business rules', () => {

  describe('Inital state', () => {
    it('should have two players in the game (X and O)', () => {
      const gameBoard = new Board
      const ticTacToe = new TicTacToe(gameBoard);
      const players = ['X', 'O'];
      expect(ticTacToe.players()).toEqual(players);
    });
    it('should have a field of a 3x3 grid', () => {
      const gameBoard = new Board
      const ticTacToe = new TicTacToe(gameBoard);
      const board = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ];
      expect(ticTacToe.board()).toEqual(board)
    });
    it('should have a field of a 5x5 grid', () => {
      const gameBoard = new Board(5)
      const ticTacToe = new TicTacToe(gameBoard);
      const board = [
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
      ];
      expect(ticTacToe.board()).toEqual(board)
    });
  });

  describe('Game turns', () => {
    it('a player can take a field if not already taken', () => {
      const gameBoard = new Board
      const ticTacToe = new TicTacToe(gameBoard);
      ticTacToe.turn(0, 0);
      expect(ticTacToe.board()[0][0]).not.toBeNull()
    });
    it('a player can\'t take a field if already taken', () => {
      const gameBoard = new Board
      const ticTacToe = new TicTacToe(gameBoard);
      ticTacToe.turn(0, 0);
      expect(() => ticTacToe.turn(0, 0)).toThrow();
    });
    it('players take turns one after another', () => {
      const gameBoard = new Board
      const ticTacToe = new TicTacToe(gameBoard);
      ticTacToe.turn(0, 0);
      ticTacToe.turn(0, 1);
      expect(ticTacToe.board()[0][0]).toBe('X')
      expect(ticTacToe.board()[0][1]).toBe('O')
    });
    it('after 4 turns there should be 2 Xs and 2 Os', () => {
      const gameBoard = new Board
      const ticTacToe = new TicTacToe(gameBoard);

      ticTacToe.turn(0, 0);
      ticTacToe.turn(0, 1);
      ticTacToe.turn(0, 2);
      ticTacToe.turn(1, 1);

      const board = ticTacToe.board().flat();

      expect(board.filter(c => c === 'X')).toHaveLength(2)
      expect(board.filter(c => c === 'O')).toHaveLength(2)
    });
  });

  describe('Game over', () => {
    it('a game is over when all fields in a row are taken by a player', () => {
      const gameBoard = new Board
      const ticTacToe = new TicTacToe(gameBoard);

      ticTacToe.turn(0, 0);
      ticTacToe.turn(1, 1);
      ticTacToe.turn(0, 1);
      ticTacToe.turn(1, 2);
      ticTacToe.turn(0, 2);

      const board = ticTacToe.board().flat();

      expect(board.filter(c => c === 'X')).toHaveLength(3)
      expect(board.filter(c => c === 'O')).toHaveLength(2)

      expect(ticTacToe.currentGameStatus()).toBe('GAME OVER')
    });
    it('a game is over when all fields in a column are taken by a player', () => {
      const gameBoard = new Board
      const ticTacToe = new TicTacToe(gameBoard);

      ticTacToe.turn(0, 0);
      ticTacToe.turn(0, 1);
      ticTacToe.turn(1, 0);
      ticTacToe.turn(0, 2);
      ticTacToe.turn(2, 0);

      const board = ticTacToe.board().flat();

      expect(board.filter(c => c === 'X')).toHaveLength(3)
      expect(board.filter(c => c === 'O')).toHaveLength(2)

      expect(ticTacToe.currentGameStatus()).toBe('GAME OVER')
    });
    it('a game is over when all fields in a diagonal are taken by a player', () => {
      const gameBoard = new Board
      const ticTacToe = new TicTacToe(gameBoard);

      ticTacToe.turn(0, 0);
      ticTacToe.turn(0, 1);
      ticTacToe.turn(1, 1);
      ticTacToe.turn(0, 2);
      ticTacToe.turn(2, 2);

      const board = ticTacToe.board().flat();

      expect(board.filter(c => c === 'X')).toHaveLength(3)
      expect(board.filter(c => c === 'O')).toHaveLength(2)

      expect(ticTacToe.currentGameStatus()).toBe('GAME OVER')
    });
    it('a game is over when all fields are taken', () => {
      const gameBoard = new Board
      const ticTacToe = new TicTacToe(gameBoard);

      // Fill the board in a sequence that results in a draw
      ticTacToe.turn(0, 0); // X
      ticTacToe.turn(0, 1); // O
      ticTacToe.turn(0, 2); // X
      ticTacToe.turn(1, 1); // O
      ticTacToe.turn(1, 0); // X
      ticTacToe.turn(1, 2); // O
      ticTacToe.turn(2, 1); // X
      ticTacToe.turn(2, 0); // O
      ticTacToe.turn(2, 2); // X

      const board = ticTacToe.board().flat();

      // A full board always has 5 'X's and 4 'O's (assuming X goes first)
      expect(board.filter(c => c === 'X')).toHaveLength(5);
      expect(board.filter(c => c === 'O')).toHaveLength(4);
      expect(board.includes(null)).toBe(false); // Ensure the board is completely full

      expect(ticTacToe.currentGameStatus()).toBe('GAME OVER')
    });
  });
});

/** SOLID things to keep in mind 
  Watch out for the "God Class" (Single Responsibility Principle). (multiple classes)
  Design for tomorrow's rule changes (Open/Closed Principle). (4x4 instead of 3x3)
  Think about who drives the game (Dependency Inversion Principle). (independent core game logic)
*/