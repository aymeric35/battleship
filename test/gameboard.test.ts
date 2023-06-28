import { describe, expect, test } from 'vitest'
import Ship from '~/factories/Ship'
import Gameboard from '~/factories/Gameboard'

describe('placeShip method', () => {
  test('Ship should be placed correctly in the gameboard', () => {
    const gameBoard = Gameboard()
    gameBoard.placeShip(Ship(3), 1, 3)
    expect(gameBoard.board[1][3]).toEqual(0)
    expect(gameBoard.board[1][4]).toEqual(0)
    expect(gameBoard.board[1][5]).toEqual(0)
  })

  test('Ship can be placed at the beginning of a row', () => {
    const gameBoard = Gameboard()
    gameBoard.placeShip(Ship(3), 1, 0)
    expect(gameBoard.board[1][0]).toEqual(0)
    expect(gameBoard.board[1][1]).toEqual(0)
    expect(gameBoard.board[1][2]).toEqual(0)
  })

  test('Ship can be placed at the end of a row', () => {
    const gameBoard = Gameboard()
    gameBoard.placeShip(Ship(3), 5, 7)
    expect(gameBoard.board[5][7]).toEqual(0)
    expect(gameBoard.board[5][8]).toEqual(0)
    expect(gameBoard.board[5][9]).toEqual(0)
  })

  test('Ship should not be able to exceed a row', () => {
    const gameBoard = Gameboard()
    expect(() => gameBoard.placeShip(Ship(3), 1, 9)).toThrowError()
    expect(gameBoard.board[1][9]).toEqual(-1)
  })
})

describe('receiveAttack method', () => {
  test('1 - Board correctly updates after a ship has been hit', () => {
    const gameBoard = Gameboard()
    gameBoard.placeShip(Ship(2), 2, 6)
    expect(gameBoard.board[2][7]).toEqual(0)
    gameBoard.receiveAttack(2, 6)
    expect(gameBoard.board[2][6]).toEqual(-2)
    expect(gameBoard.board[2][7]).toEqual(0)
  })

  test('2 - Board correctly updates after a ship has been hit', () => {
    const gameBoard = Gameboard()
    gameBoard.placeShip(Ship(2), 9, 8)
    expect(gameBoard.board[9][8]).toEqual(0)
    expect(gameBoard.board[9][9]).toEqual(0)
    gameBoard.receiveAttack(9, 9)
    expect(gameBoard.board[9][9]).toEqual(-2)
    expect(gameBoard.board[9][8]).toEqual(0)
  })

  test('3 - Board correctly updates after a ship has been hit', () => {
    const gameBoard = Gameboard()
    gameBoard.placeShip(Ship(2), 0, 0)
    expect(gameBoard.board[0][0]).toEqual(0)
    gameBoard.receiveAttack(0, 0)
    expect(gameBoard.board[0][0]).toEqual(-2)
    expect(gameBoard.board[0][1]).toEqual(0)
  })

  test('Ship length correctly updates after it has been hit', () => {
    const gameBoard = Gameboard()
    gameBoard.placeShip(Ship(3), 4, 6)
    gameBoard.receiveAttack(4, 7)
    expect(gameBoard.ships[0].getHits()).toEqual(1)
  })

  test('Ship should be sunk', () => {
    const gameBoard = Gameboard()
    gameBoard.placeShip(Ship(3), 0, 0)
    gameBoard.receiveAttack(0, 0)
    gameBoard.receiveAttack(0, 1)
    gameBoard.receiveAttack(0, 2)
    expect(gameBoard.ships[0].getHits()).toEqual(3)
    expect(gameBoard.ships[0].isSunk()).toBeTruthy()
  })

  test('Missed hit correctly updates the board', () => {
    const gameBoard = Gameboard()
    gameBoard.receiveAttack(0, 0)
    gameBoard.receiveAttack(0, 1)
    gameBoard.receiveAttack(0, 2)
    expect(gameBoard.board[0][0]).toEqual(-3)
    expect(gameBoard.board[0][1]).toEqual(-3)
    expect(gameBoard.board[0][2]).toEqual(-3)
  })

  test('The board should be empty at the start of a game', () => {
    const gameBoard = Gameboard()
    expect(gameBoard.board.every(x => x.every(y => y === -1))).toBeTruthy()
  })
})

describe('areAllShipsSunk method', () => {
  test('1 - The method should be true', () => {
    const gameBoard = Gameboard()
    gameBoard.placeShip(Ship(3), 0, 0)
    gameBoard.receiveAttack(0, 0)
    gameBoard.receiveAttack(0, 1)
    gameBoard.receiveAttack(0, 2)
    expect(gameBoard.isGameOver()).toBeTruthy()
  })

  test('2 - The method should be true', () => {
    const gameBoard = Gameboard()
    gameBoard.placeShip(Ship(3), 0, 0)
    gameBoard.placeShip(Ship(2), 7, 0)
    gameBoard.placeShip(Ship(2), 9, 8)
    gameBoard.placeShip(Ship(1), 5, 0)
    gameBoard.placeShip(Ship(1), 6, 5)
    gameBoard.receiveAttack(0, 0)
    gameBoard.receiveAttack(0, 1)
    gameBoard.receiveAttack(0, 2)
    gameBoard.receiveAttack(7, 0)
    gameBoard.receiveAttack(7, 1)
    gameBoard.receiveAttack(9, 8)
    gameBoard.receiveAttack(9, 9)
    gameBoard.receiveAttack(5, 0)
    gameBoard.receiveAttack(6, 5)
    expect(gameBoard.isGameOver()).toBeTruthy()
  })

  test('1 - The method should be false', () => {
    const gameBoard = Gameboard()
    gameBoard.placeShip(Ship(3), 0, 0)
    gameBoard.receiveAttack(0, 0)
    gameBoard.receiveAttack(0, 1)
    expect(gameBoard.isGameOver()).toBeFalsy()
  })

  test('2 - The method should be false', () => {
    const gameBoard = Gameboard()
    gameBoard.placeShip(Ship(3), 0, 0)
    gameBoard.placeShip(Ship(2), 7, 0)
    gameBoard.placeShip(Ship(2), 9, 8)
    gameBoard.placeShip(Ship(1), 5, 0)
    gameBoard.placeShip(Ship(1), 6, 5)
    gameBoard.receiveAttack(0, 0)
    gameBoard.receiveAttack(0, 1)
    gameBoard.receiveAttack(0, 2)
    gameBoard.receiveAttack(7, 0)
    gameBoard.receiveAttack(7, 1)
    gameBoard.receiveAttack(9, 8)
    gameBoard.receiveAttack(9, 9)
    expect(gameBoard.isGameOver()).toBeFalsy()
  })
})
