import type Gameboard from './Gameboard'

export default function Player(name = 'Player') {
  if (name.length > 10)
    throw new Error('Name cannot exceed 10 characters')

  name = name[0].toUpperCase() + name.slice(1)

  const getName = (): string => {
    return name
  }

  const attack = (x: number, y: number, gameboard: ReturnType<typeof Gameboard>): void => {
    gameboard.receiveAttack(x, y)
  }

  return { getName, attack }
}
