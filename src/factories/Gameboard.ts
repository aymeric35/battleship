import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import type Ship from '~/factories/Ship'
import { hitType } from '~/enums'

export default function Gameboard() {
  const board = ref<number[][]>(Array(10).fill(-1).map(() => Array(10).fill(-1))).value
  const ships: ReturnType<typeof Ship>[] = []

  const placeShip = (ship: ReturnType<typeof Ship>, x: number, y: number): void => {
    if (ships.length === 5)
      throw new Error('No more ships can be created')

    if ((ship.length + y) > 10)
      throw new Error('Ship is too long to be placed at this position')

    ships.push(ship)
    for (let i = 0; i < ship.length; i++)
      board[x].splice(y + i, 1, ships.length - 1)
  }

  const receiveAttack = (x: number, y: number): hitType | undefined => {
    const location = board[x][y]
    const isShip = ![hitType.EMPTY, hitType.HIT, hitType.MISSED].includes(location)
    if (isShip) {
      ships[location].hit()
      board[x].splice(y, 1, hitType.HIT)
      return hitType.HIT
    }
    if (location === hitType.EMPTY) {
      board[x].splice(y, 1, hitType.MISSED)
      return hitType.EMPTY
    }

    if (location === hitType.HIT || location === hitType.MISSED) {
      toast.error('You already hit that position')
      return hitType.ALREADYHIT
    }
  }

  const isGameOver = (): boolean => {
    return ships.every(ship => ship.isSunk())
  }

  return { placeShip, receiveAttack, isGameOver, board, ships }
}
