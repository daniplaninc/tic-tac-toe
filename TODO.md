# Plan

- refactor ideas
    - parametrize the test generation for winning condition
- iterate to fix SOLID violations
    - convert X and O into Player object
    - Create Board interface and implementations
    - getGameStatus and getDiagonalWinningState violate SRP
- future posibilities
    - add test cases for bigger boards
    - allow for more players? probably only makes sense on bigger boards
    - random board for test case generation (good or bad?)
    - parametrize board size in tests
    - have an external game class with identites type in order to have an enum for more than just 2 types of players (maybe type can go outside of class?)