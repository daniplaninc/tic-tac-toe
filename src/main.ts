class Game { }
class Board { }
class Player { }

export class TicTacToe {
    private currentPlayer: 'X' | 'O';
    private gameStatus: 'GAME ONGOING' | 'GAME OVER';
    private currentBoard: any;

    constructor() {
        this.currentPlayer = 'X';
        this.gameStatus = 'GAME ONGOING';
        this.currentBoard = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
    }

    public players() {
        return ['X', 'O']
    }

    public currentGameStatus() {
        const board = this.board();
        const hasWinningRow = this.currentBoard.some(row =>
            row.every(cell => cell === 'X') || row.every(cell => cell === 'O')
        );
        const hasWinningCol = this.currentBoard[0].some((_, colIndex) =>
            this.currentBoard.every(row => row[colIndex] === 'X') || this.currentBoard.every(row => row[colIndex] === 'O'));

        if (hasWinningRow || hasWinningCol) {
            this.gameStatus = 'GAME OVER'
        }
        return this.gameStatus
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