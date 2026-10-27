class Game { }
export class Board {
    private currentBoard: any;
    private gameStatus: 'GAME ONGOING' | 'GAME OVER';

    constructor(boardSize: number = 3) {
        this.currentBoard = this.generateBoard(boardSize)
        this.gameStatus = 'GAME ONGOING';
    }

    private generateBoard(size: number){
        const board = Array(size).fill(null).map(() => Array(size).fill(null));
        
        return board
    }

    public getGameBoard() {
        return this.currentBoard
    }

    public getGameStatus() {
        const board = this.currentBoard;
        const boardIsFull = !board.includes(null);
        const hasWinningRow = this.currentBoard.some(row =>
            row.every(cell => cell === 'X') || row.every(cell => cell === 'O')
        );
        const hasWinningCol = this.currentBoard[0].some((_, colIndex) =>
            this.currentBoard.every(row => row[colIndex] === 'X') || this.currentBoard.every(row => row[colIndex] === 'O'));
        const hasWinningDiagonal =
            // Check for 'X'
            (this.currentBoard[0][0] === 'X' && this.currentBoard[1][1] === 'X' && this.currentBoard[2][2] === 'X') ||
            (this.currentBoard[0][2] === 'X' && this.currentBoard[1][1] === 'X' && this.currentBoard[2][0] === 'X') ||
            // Check for 'O'
            (this.currentBoard[0][0] === 'O' && this.currentBoard[1][1] === 'O' && this.currentBoard[2][2] === 'O') ||
            (this.currentBoard[0][2] === 'O' && this.currentBoard[1][1] === 'O' && this.currentBoard[2][0] === 'O');
        if (hasWinningRow || hasWinningCol || hasWinningDiagonal || boardIsFull) {
            this.gameStatus = 'GAME OVER'
        }

        return this.gameStatus
    }
}
class Player { }

export class TicTacToe {
    private currentPlayer: 'X' | 'O';
    private gameBoard: Board;

    constructor(gameBoard: Board) {
        this.currentPlayer = 'X';
        this.gameBoard = gameBoard
    }

    public players() {
        return ['X', 'O']
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