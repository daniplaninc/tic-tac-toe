class Game { }
export class Player {
    constructor(public identity: 'X' | 'O') {}
    toString(): string {
        return this.identity;
    }
}
interface iBoard {
    getGameBoard(): any;
    getGameStatus(): 'GAME ONGOING' | 'GAME OVER';
}
export class Board implements iBoard {
    private currentBoard: any;
    private gameStatus: 'GAME ONGOING' | 'GAME OVER';

    constructor(boardSize: number = 3) {
        this.currentBoard = this.generateBoard(boardSize)
        this.gameStatus = 'GAME ONGOING';
    }

    private generateBoard(size: number) {
        const board = Array(size).fill(null).map(() => Array(size).fill(null));

        return board
    }

    public getGameBoard() {
        return this.currentBoard
    }

    public getGameStatus() {
        const board = this.currentBoard;
        const boardIsFull = !this.currentBoard.flat().includes(null);
        const hasWinningRow = this.currentBoard.some(row =>
            row.every(cell => cell === 'X') || row.every(cell => cell === 'O')
        );
        const hasWinningCol = this.currentBoard[0].some((_, colIndex) =>
            this.currentBoard.every(row => row[colIndex] === 'X') || this.currentBoard.every(row => row[colIndex] === 'O'));

        if (hasWinningRow || hasWinningCol || this.getDiagonalWinningState() || boardIsFull) {
            this.gameStatus = 'GAME OVER'
        }

        return this.gameStatus
    }

    private getDiagonalWinningState() {
        const size = this.currentBoard.length;

        // 1. Grab the top-left and top-right values
        const mainDiagFirst = this.currentBoard[0][0];
        const antiDiagFirst = this.currentBoard[0][size - 1];

        // 2. Check if the entire diagonal matches its first item (and isn't null)
        const hasMainDiagonalWin = mainDiagFirst !== null &&
            this.currentBoard.every((row, i) => row[i] === mainDiagFirst);

        const hasAntiDiagonalWin = antiDiagFirst !== null &&
            this.currentBoard.every((row, i) => row[size - 1 - i] === antiDiagFirst);

        // 3. Combine the results
        return hasMainDiagonalWin || hasAntiDiagonalWin;
    }
}

export class TicTacToe {
    private currentPlayer: 'X' | 'O';
    private gameBoard: iBoard;

    constructor(gameBoard: iBoard, public players: Array<Player>) {
        this.currentPlayer = 'X';
        this.gameBoard = gameBoard
    }

    public currentGameStatus() {
        return this.gameBoard.getGameStatus()
    }

    public board() {
        return this.gameBoard.getGameBoard();
    }

    public turn(col: number, row: number) {
        if (this.board()[col][row] === null) {
            this.board()[col][row] = this.currentPlayer;
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
        } else {
            throw new Error('');
        }
    }
}