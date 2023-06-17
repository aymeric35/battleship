import type Gameboard from './Gameboard'

export default function Player() {
  let name = 'Player'
  const defineName = (n: string): void => {
    if (n.length > 10)
      throw new Error('Name cannot exceed 10 characters')

    if (name && name !== 'Player')
      throw new Error('Name has already been defined')

    name = n[0].toUpperCase() + n.slice(1)
  }

  const getName = (): string => {
    return name
  }

  const attack = (x: number, y: number, gameboard: ReturnType<typeof Gameboard>): void => {
    gameboard.receiveAttack(x, y)
  }

  return { defineName, getName, attack }
}
