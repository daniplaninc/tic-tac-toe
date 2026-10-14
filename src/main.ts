class Game { }
class Board { }
class Player { }

export class TicTacToe {
    private currentPlayer: 'X' | 'O';
    private currentBoard: any;

    constructor() {
        this.currentPlayer = 'X';
        this.currentBoard = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
    }

    public players() {
        return ['X', 'O']
    }

    public board() {
        return this.currentBoard;
    }

    public turn(col: number, row: number) {
        if (this.currentBoard[col][row] === null) {
            this.currentBoard[col][row] = this.currentPlayer;
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
        } else {
            throw new Error('');
        }
    }
}