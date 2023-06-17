import Player from './Player'
import type Gameboard from './Gameboard'

export default function AI() {
  const player = Player()
  const hits: number[][] = Array(10).fill(0).map(() => Array(10).fill(0))
  let count = 0

  const randomAttack = (gameboard: ReturnType<typeof Gameboard>) => {
    if (count === 20)
      throw new Error('No more hits allowed')

    const randomX = () => Math.floor(Math.random() * 10)
    const randomY = () => Math.floor(Math.random() * 10)
    const attack = (): void => {
      const x = randomX()
      const y = randomY()
      if (hits[x][y] === 1)
        return attack()

      gameboard.receiveAttack(x, y)
      hits[x][y] = 1
      count++
    }

    attack()
  }

  const getCount = () => count

  return { defineName: player.defineName, getName: player.getName, randomAttack, getCount }
}
