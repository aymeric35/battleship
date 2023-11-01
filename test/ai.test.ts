import { describe, expect, test } from 'vitest'
import AI from '~/factories/AI'
import Gameboard from '~/factories/Gameboard'

describe('aiAttack method', () => {
  test('A random attack with a full board should throw an error', () => {
    const ai = AI()
    const gameboard = Gameboard()
    expect(() => {
      while (ai.getCount() !== 100)
        ai.aiAttack(gameboard)
      ai.aiAttack(gameboard)
    }).toThrowError('No more hits allowed')
  })
})
