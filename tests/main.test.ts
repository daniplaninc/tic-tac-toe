import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { ticTacToe } from '../src/main.ts';

describe('Inital state', () => {
  it('should add two numbers correctly', () => {
    assert.equal(ticTacToe(2, 3), 5);
  });
});