import type Ship from '~/factories/Ship'

enum hitType {
  EMPTY = -1,
  HIT = -2,
  MISSED = -3,
  ALREADYHIT = MISSED || HIT,
}

export default function Gameboard() {
  const board: number[][] = Array(10).fill(-1).map(() => Array(10).fill(-1))
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

  const receiveAttack = (x: number, y: number): void => {
    const location = board[x][y]
    const isShip = ![hitType.EMPTY, hitType.HIT, hitType.MISSED].includes(location)
    if (isShip) {
      ships[location].hit()
      board[x].splice(y, 1, hitType.HIT)
    }
    if (location === hitType.EMPTY)
      board[x].splice(y, 1, hitType.MISSED)
    if (location === hitType.ALREADYHIT)
      throw new Error('You already hit that position')
  }

  const areAllShipsSunk = (): boolean => {
    return ships.every(ship => ship.isSunk())
  }

  return { placeShip, receiveAttack, areAllShipsSunk, board, ships }
}
