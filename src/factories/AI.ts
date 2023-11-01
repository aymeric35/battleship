import Player from './Player'
import type Gameboard from './Gameboard'
import { hitType, modeType } from '~/enums'

export default function AI() {
  const player = Player('AI')
  const hits: number[][] = Array(10).fill(0).map(() => Array(10).fill(0))
  const hitPositionsStack: [number, number][] = []
  let focusTarget = false
  let mode: modeType = modeType.RANDOM
  let attackResult: hitType | undefined
  let count = 0
  let test = true

  const getRandomPosition = (): [number, number] => {
    const x = Math.floor(Math.random() * 10)
    const y = Math.floor(Math.random() * 10)
    return [x, y]
  }

  const getNextPosition = (): [number, number] => {
    if (mode === modeType.RANDOM)
      return getRandomPosition()

    let [x, y] = [0, 0]

    if (hitPositionsStack.length > 1)
      [x, y] = hitPositionsStack.pop() || [0, 0]
    else
      [x, y] = hitPositionsStack[0]

    switch (mode) {
      case modeType.RIGHT:
        return [x, y + 1]
      case modeType.LEFT:
        return [x, y - 1]
      case modeType.TOP:
        return [x - 1, y]
      case modeType.BOTTOM:
        return [x + 1, y]
      default:
        return [0, 0]
    }
  }

  const switchMode = () => {
    const modes: string[] = ['right', 'left', 'top', 'bottom']
    const currentModeIndex = modes.indexOf(mode)
    mode = modes[(currentModeIndex + 1) % modes.length] as modeType
  }

  const handleAttackResult = (x: number, y: number) => {
    if (count === 100)
      throw new Error('No more hits allowed')

    if (attackResult === hitType.HIT) {
      hitPositionsStack.push([x, y])
      if (!focusTarget) {
        mode = modeType.RIGHT
        focusTarget = true
      }
    }
    else {
      if (attackResult === hitType.HITANDSUNK) {
        mode = modeType.RANDOM
        hitPositionsStack.length = 0
        if (focusTarget)
          focusTarget = false
      }
      else if (focusTarget) {
        switchMode()
      }
    }
  }

  const aiAttack = (gameboard: ReturnType<typeof Gameboard>): void => {
    let [x, y] = [0, 0]
    if (test) {
      [x, y] = [0, 3]
      test = false
    }
    else {
      [x, y] = getNextPosition()
    }

    if (hits[x][y] === 1) {
      if (focusTarget)
        switchMode()
      return aiAttack(gameboard)
    }
    attackResult = gameboard.receiveAttack(x, y)
    handleAttackResult(x, y)
    hits[x][y] = 1
    count++
  }

  const getCount = () => count

  return { getName: player.getName, handleAttackResult, getCount, aiAttack }
}
