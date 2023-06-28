import { describe, expect, test } from 'vitest'
import Gameboard from '~/factories/Gameboard'
import Player from '~/factories/Player'
import Ship from '~/factories/Ship'

describe('Name constraints', () => {
  test('A name with less than 10 characters should correctly be defined', () => {
    const player = Player('Toto')
    expect(player.getName()).toEqual('Toto')
  })

  test('A name whose first letter is lowercase should be uppercased', () => {
    const player = Player('tata')
    expect(player.getName()).toEqual('Tata')
  })

  test('A name with more than 10 characters should throw an error', () => {
    expect(() => Player('tatatatatatata')).toThrowError('Name cannot exceed 10 characters')
  })
})

describe('attack method', () => {
  test('1 - Attack method should correctly updates the board', () => {
    const player = Player()
    const gameboard = Gameboard()
    player.attack(0, 0, gameboard)
    expect(gameboard.board[0][0]).toEqual(-3)
  })

  test('2 - Attack method should correctly updates the board', () => {
    const player = Player()
    const gameboard = Gameboard()
    player.attack(9, 9, gameboard)
    expect(gameboard.board[9][9]).toEqual(-3)
  })

  test('3 - Attack method should correctly updates the board', () => {
    const player = Player()
    const gameboard = Gameboard()
    gameboard.placeShip(Ship(3), 1, 1)
    player.attack(1, 1, gameboard)
    player.attack(1, 2, gameboard)
    expect(gameboard.board[1][1]).toEqual(-2)
    expect(gameboard.board[1][2]).toEqual(-2)
    expect(gameboard.board[1][3]).toEqual(0)
  })
})
