import { describe, expect, test } from 'vitest'
import Game from '~/factories/Game'

describe('Game loop', () => {
  test('nextTurn should correctly updates the currentTurn assignation', () => {
    const game = Game()
    game.start()
    const currentPlayer = game.getCurrentTurn().value
    game.nextTurn()
    expect(game.getCurrentTurn().value).not.toEqual(currentPlayer)
  })

  test('Player and AI default names', () => {
    const game = Game()
    game.start()
    expect(game.player1.getName()).toEqual('Player')
    expect(game.player2.getName()).toEqual('AI')
  })
})
